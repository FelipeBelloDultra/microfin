import { TransactionAccount } from "../../domain/entity/transaction-account";
import { MessageProviderFactory } from "../factory/message-provider-factory";
import { RepositoryFactory } from "../factory/repository-factory";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";
import { TransactionRepository } from "../repository/transaction-repository";

interface Account {
  id: string;
  amount: number;
  externalAccountId: string;
  email: string;
}

interface Input {
  fromAccount: Account;
  toAccount: Account;
  transactionId: string;
  value: number;
}

export class ProcessTransaction {
  private readonly transactionAccountRepository: TransactionAccountRepository;
  private readonly transactionRepository: TransactionRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory
  ) {
    this.transactionAccountRepository =
      repositoryFactory.createTransactionAccountRepository();
    this.transactionRepository =
      repositoryFactory.createTransactionRepository();
  }

  public async execute({
    fromAccount,
    toAccount,
    transactionId,
    value,
  }: Input) {
    const transaction = await this.transactionRepository.findById(
      transactionId
    );
    if (!transaction) throw new Error("Could not find transaction");

    if (fromAccount.amount < value) {
      transaction.refuse();
      transaction.changeObservation("Insufficient balance in origin account");
      await this.transactionRepository.update(transaction);

      return;
    }

    const toAccountInstance = TransactionAccount.create(
      {
        amount: toAccount.amount,
        email: toAccount.email,
        externalAccountId: toAccount.externalAccountId,
      },
      toAccount.id
    );
    const fromAccountInstance = TransactionAccount.create(
      {
        amount: fromAccount.amount,
        email: fromAccount.email,
        externalAccountId: fromAccount.externalAccountId,
      },
      fromAccount.id
    );

    toAccountInstance.updateAmountValue(toAccount.amount + value);

    fromAccountInstance.updateAmountValue(fromAccount.amount - value);

    await Promise.all([
      this.transactionAccountRepository.update(toAccountInstance),
      this.transactionAccountRepository.update(fromAccountInstance),
    ]);

    transaction.complete();
    transaction.changeObservation("Transaction completed successfully");

    await this.transactionRepository.update(transaction);

    await this.messageProviderFactory.emitTransactionCompleteTransactionMessage(
      {
        from: {
          externalId: fromAccountInstance.externalAccountId,
          newAmount: fromAccountInstance.amount,
        },
        to: {
          externalId: toAccountInstance.externalAccountId,
          newAmount: toAccountInstance.amount,
        },
      }
    );
  }
}
