import { MessageProvider } from "../../application/providers/message-provider";
import { AccountRepository } from "../../application/repository/account-repository";
import { UpdateAccountBeforeCompleteTransaction } from "../../application/use-cases/update-account-before-complete-transaction";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly accountRepository: AccountRepository
  ) {
    this.updateAccountDataBeforeCompleteTransaction();
  }

  public updateAccountDataBeforeCompleteTransaction() {
    const updateAccountDataBeforeCompleteTransaction =
      new UpdateAccountBeforeCompleteTransaction(this.accountRepository);

    this.messageProvider.onMessage(
      "transaction.complete-transaction",
      updateAccountDataBeforeCompleteTransaction.execute.bind(
        updateAccountDataBeforeCompleteTransaction
      )
    );
  }
}
