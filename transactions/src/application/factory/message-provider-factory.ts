import { MessageProvider } from "../providers/message-provider";

type EmitTransactionProcessCreatedTransactionData = {
  from: {
    id: string;
    amount: number;
    externalAccountId: string;
    email: string;
  };
  to: {
    id: string;
    amount: number;
    externalAccountId: string;
    email: string;
  };
  transaction: {
    id: string;
    value: number;
  };
};

type EmitTransactionCompleteTransactionData = {
  from: {
    externalId: string;
    newAmount: number;
  };
  to: {
    externalId: string;
    newAmount: number;
  };
};

export class MessageProviderFactory {
  constructor(private readonly messageProvider: MessageProvider) {}

  public async emitTransactionProcessCreatedTransactionMessage(
    data: EmitTransactionProcessCreatedTransactionData
  ) {
    const fromAccount = {
      id: data.from.id,
      amount: data.from.amount,
      externalAccountId: data.from.externalAccountId,
      email: data.from.email,
    };
    const toAccount = {
      id: data.to.id,
      amount: data.to.amount,
      externalAccountId: data.to.externalAccountId,
      email: data.to.email,
    };

    const toProcessTransactionPayload = Buffer.from(
      JSON.stringify({
        fromAccount,
        toAccount,
        transactionId: data.transaction.id,
        value: data.transaction.value,
      })
    );

    await this.messageProvider.sendMessage(
      "transaction.process-created-transaction",
      toProcessTransactionPayload
    );
  }

  public async emitTransactionCompleteTransactionMessage(
    data: EmitTransactionCompleteTransactionData
  ) {
    await this.messageProvider.sendMessage(
      "transaction.complete-transaction",
      Buffer.from(
        JSON.stringify({
          fromAccount: {
            id: data.from.externalId,
            newValue: data.from.newAmount,
          },
          toAccount: {
            id: data.to.externalId,
            newValue: data.to.newAmount,
          },
        })
      )
    );
  }
}
