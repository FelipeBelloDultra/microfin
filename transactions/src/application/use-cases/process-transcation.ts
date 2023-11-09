import { TransactionAccount } from "../../domain/entity/transaction-account";
import { MessageProvider } from "../providers/message-provider";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";
import { TransactionRepository } from "../repository/transaction-repository";

interface Account {
  id: string;
  amount: number;
  code?: string;
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
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionAccountRepository: TransactionAccountRepository,
    private readonly messageProvider: MessageProvider
  ) {}

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

    const toAccountInstance = TransactionAccount.create(
      {
        amount: toAccount.amount,
        email: toAccount.email,
        externalAccountId: toAccount.externalAccountId,
        code: toAccount.code,
      },
      toAccount.id
    );
    const fromAccountInstance = TransactionAccount.create(
      {
        amount: fromAccount.amount,
        email: fromAccount.email,
        externalAccountId: fromAccount.externalAccountId,
        code: fromAccount.code,
      },
      fromAccount.id
    );

    toAccountInstance.updateAmountValue(toAccount.amount + value);
    await this.transactionAccountRepository.update(toAccountInstance);

    fromAccountInstance.updateAmountValue(fromAccount.amount - value);
    await this.transactionAccountRepository.update(fromAccountInstance);

    transaction.complete();
    await this.transactionRepository.update(transaction);

    await this.messageProvider.sendMessage(
      "transaction.complete-transaction",
      Buffer.from(
        JSON.stringify({
          fromAccount: {
            id: fromAccountInstance.externalAccountId,
            newValue: fromAccountInstance.amount,
          },
          toAccount: {
            id: toAccountInstance.externalAccountId,
            newValue: toAccountInstance.amount,
          },
        })
      )
    );
  }
}
