import { MessageProvider } from "../../application/providers/message-provider";
import { UpdateTransactionAccounts } from "../../application/use-cases/update-transaction-accounts";
import { DatabaseRepositoryFactory } from "../factory/database-repository-factory";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly repositoryFactory: DatabaseRepositoryFactory
  ) {
    this.updateTransactionAccounts();
  }

  public updateTransactionAccounts() {
    const updateTransactionAccounts = new UpdateTransactionAccounts(
      this.repositoryFactory
    );

    this.messageProvider.onMessage(
      "transaction.complete-transaction",
      updateTransactionAccounts.execute.bind(updateTransactionAccounts)
    );
  }
}
