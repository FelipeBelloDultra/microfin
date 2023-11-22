import { Transaction } from "../../domain/entity/transaction";
import { MessageProviderFactory } from "../factory/message-provider-factory";
import { RepositoryFactory } from "../factory/repository-factory";
import { CacheProvider } from "../providers/cache-provider";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";
import { TransactionRepository } from "../repository/transaction-repository";

interface Input {
  accountTo: string;
  accountFrom: string;
  value: number;
}

export class CreateTransaction {
  private readonly transactionAccountRepository: TransactionAccountRepository;
  private readonly transactionRepository: TransactionRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory,
    private readonly cacheProvider: CacheProvider
  ) {
    this.transactionAccountRepository =
      repositoryFactory.createTransactionAccountRepository();
    this.transactionRepository =
      repositoryFactory.createTransactionRepository();
  }

  public async execute({ accountFrom, accountTo, value }: Input) {
    if (accountTo === accountFrom) {
      await this.transactionRepository.create(
        Transaction.create({
          accountFrom,
          accountTo,
          status: "REFUSED",
          value,
          observation: "Unable to create a transaction for your account",
        })
      );
      return await this.cacheProvider.invalidate(
        `transactions:${accountFrom}:*`
      );
    }

    const [findedAccountTo, findedAccountFrom] = await Promise.all([
      this.transactionAccountRepository.findByExternalAccountId(accountTo),
      this.transactionAccountRepository.findByExternalAccountId(accountFrom),
    ]);

    if (!findedAccountTo || !findedAccountFrom) {
      return;
    }

    const transaction = Transaction.create({
      accountFrom,
      accountTo,
      status: "PENDING",
      value,
    });

    await this.transactionRepository.create(transaction);
    await this.cacheProvider.invalidate(`transactions:${accountFrom}:*`);

    await this.messageProviderFactory.emitTransactionProcessCreatedTransactionMessage(
      {
        from: {
          id: findedAccountFrom.id,
          amount: findedAccountFrom.amount,
          externalAccountId: findedAccountFrom.externalAccountId,
          email: findedAccountFrom.email,
        },
        to: {
          id: findedAccountTo.id,
          amount: findedAccountTo.amount,
          externalAccountId: findedAccountTo.externalAccountId,
          email: findedAccountTo.email,
        },
        transaction: {
          id: transaction.id,
          value: transaction.value,
        },
      }
    );
  }
}
