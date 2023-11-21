import { MessageProvider } from "../../application/providers/message-provider";
import { UseCaseFactory } from "../factory/use-case-factory";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly useCaseFactory: UseCaseFactory
  ) {
    this.createTransactionAccount();
    this.processTransaction();
    this.updateTransactionAccountAmount();
  }

  public createTransactionAccount() {
    const createTransactionAccount =
      this.useCaseFactory.createTransactionAccount();

    this.messageProvider.onMessage<{
      email: string;
      externalAccountId: string;
      amount: number;
    }>(
      "account.created",
      createTransactionAccount.execute.bind(createTransactionAccount)
    );
  }

  public processTransaction() {
    const processTransaction = this.useCaseFactory.processTransaction();

    this.messageProvider.onMessage(
      "transaction.process-created-transaction",
      processTransaction.execute.bind(processTransaction)
    );
  }

  public updateTransactionAccountAmount() {
    const updateTransactionAccountAmount =
      this.useCaseFactory.updateTransactionAccountAmount();

    this.messageProvider.onMessage(
      "accounts.updated-amount",
      updateTransactionAccountAmount.execute.bind(
        updateTransactionAccountAmount
      )
    );
  }
}
