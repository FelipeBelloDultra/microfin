import { MessageProvider } from "../../application/providers/message-provider";
import { UseCaseFactory } from "../factory/use-case-factory";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly useCaseFactory: UseCaseFactory
  ) {
    this.updateTransactionAccounts();
  }

  public updateTransactionAccounts() {
    const updateTransactionAccounts =
      this.useCaseFactory.updateTransactionAccounts();

    this.messageProvider.onMessage(
      "transaction.complete-transaction",
      updateTransactionAccounts.execute.bind(updateTransactionAccounts)
    );
  }
}
