import { Transaction } from "../../domain/entity/transaction";
import { MessageProvider } from "../providers/message-provider";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";
import { TransactionRepository } from "../repository/transaction-repository";

interface Input {
  accountTo: string;
  accountFrom: string;
  type: "TRANSFER" | "DEPOSIT";
  value: number;
}

export class CreateTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionAccountRepository: TransactionAccountRepository,
    private readonly messageProvider: MessageProvider
  ) {}

  public async execute({ accountFrom, accountTo, type, value }: Input) {
    if (accountTo === accountFrom)
      throw new Error("Choose a different account");

    const findedAccountTo =
      this.transactionAccountRepository.findByExternalAccountId(accountTo);
    if (!findedAccountTo) throw new Error("Choose a different account");

    const findedAccountFrom =
      this.transactionAccountRepository.findByExternalAccountId(accountFrom);
    if (!findedAccountFrom) throw new Error("Choose a different account");

    const transaction = Transaction.create({
      accountFrom,
      accountTo,
      status: "PENDING",
      type,
      value,
    });

    await this.transactionRepository.create(transaction);

    const toProcessTransactionPayload = Buffer.from(
      JSON.stringify({
        accountFrom: transaction.accountFrom,
        accountTo: transaction.accountTo,
        status: transaction.status,
        type: transaction.type,
        value: transaction.value,
      })
    );

    await this.messageProvider.sendMessage(
      "transaction.process-created-transaction",
      toProcessTransactionPayload
    );
  }
}
