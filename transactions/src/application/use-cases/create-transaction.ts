import { Transaction } from "../../domain/entity/transaction";
import { MessageProvider } from "../providers/message-provider";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";
import { TransactionRepository } from "../repository/transaction-repository";

interface Input {
  accountTo: string;
  accountFrom: string;
  value: number;
}

export class CreateTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionAccountRepository: TransactionAccountRepository,
    private readonly messageProvider: MessageProvider
  ) {}

  public async execute({ accountFrom, accountTo, value }: Input) {
    if (accountTo === accountFrom)
      throw new Error("Choose a different account");

    const findedAccountTo =
      await this.transactionAccountRepository.findByExternalAccountId(
        accountTo
      );
    if (!findedAccountTo) throw new Error("Choose a different account");

    const findedAccountFrom =
      await this.transactionAccountRepository.findByExternalAccountId(
        accountFrom
      );
    if (!findedAccountFrom) throw new Error("Choose a different account");

    const transaction = Transaction.create({
      accountFrom,
      accountTo,
      status: "PENDING",
      value,
    });

    await this.transactionRepository.create(transaction);

    const fromAccount = {
      id: findedAccountFrom.id,
      amount: findedAccountFrom.amount,
      externalAccountId: findedAccountFrom.externalAccountId,
      email: findedAccountFrom.email,
    };
    const toAccount = {
      id: findedAccountTo.id,
      amount: findedAccountTo.amount,
      externalAccountId: findedAccountTo.externalAccountId,
      email: findedAccountTo.email,
    };

    const toProcessTransactionPayload = Buffer.from(
      JSON.stringify({
        fromAccount,
        toAccount,
        transactionId: transaction.id,
        value: transaction.value,
      })
    );

    await this.messageProvider.sendMessage(
      "transaction.process-created-transaction",
      toProcessTransactionPayload
    );
  }
}
