import { MessageProvider } from "../../application/providers/message-provider";
import { AccountRepository } from "../../application/repository/account-repository";
import { UpdateTransactionAccounts } from "../../application/use-cases/update-transaction-accounts";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly accountRepository: AccountRepository
  ) {
    this.updateTransactionAccounts();
  }

  public updateTransactionAccounts() {
    const updateTransactionAccounts = new UpdateTransactionAccounts(
      this.accountRepository
    );

    this.messageProvider.onMessage(
      "transaction.complete-transaction",
      updateTransactionAccounts.execute.bind(updateTransactionAccounts)
    );
  }
}
