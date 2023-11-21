import { MessageProvider } from "../providers/message-provider";

type EmitAccountCreatedData = {
  accountId: string;
  email: string;
  amount: number;
};

type EmitAccountUpdateAmountData = {
  accountId: string;
  newAmount: number;
};

export class MessageProviderFactory {
  constructor(private readonly messageProvider: MessageProvider) {}

  public async emitAccountCreatedMessage({
    accountId,
    amount,
    email,
  }: EmitAccountCreatedData) {
    const sendMessageData = Buffer.from(
      JSON.stringify({
        externalAccountId: accountId,
        email,
        amount,
      })
    );

    await this.messageProvider.sendMessage("account.created", sendMessageData);
  }

  public async emitAccountUpdateAmountMessage({
    accountId,
    newAmount,
  }: EmitAccountUpdateAmountData) {
    await this.messageProvider.sendMessage(
      "accounts.updated-amount",
      Buffer.from(
        JSON.stringify({
          accountId,
          newAccountAmount: newAmount,
        })
      )
    );
  }
}
