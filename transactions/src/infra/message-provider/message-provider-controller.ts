import { MessageProviderFactory } from "../../application/factory/message-provider-factory";
import { MessageProvider } from "../../application/providers/message-provider";
import { CreateTransactionAccount } from "../../application/use-cases/create-transaction-account";
import { ProcessTransaction } from "../../application/use-cases/process-transcation";
import { UpdateTransactionAccountAmount } from "../../application/use-cases/update-transaction-account-amount";
import { DatabaseRepositoryFactory } from "../factory/database-repository-factory";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly repositoryFactory: DatabaseRepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory
  ) {
    this.createTransactionAccount();
    this.processTransaction();
    this.updateTransactionAccountAmount();
  }

  public createTransactionAccount() {
    const createTransactionAccount = new CreateTransactionAccount(
      this.repositoryFactory
    );

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
    const processTransaction = new ProcessTransaction(
      this.repositoryFactory,
      this.messageProviderFactory
    );

    this.messageProvider.onMessage(
      "transaction.process-created-transaction",
      processTransaction.execute.bind(processTransaction)
    );
  }

  public updateTransactionAccountAmount() {
    const updateTransactionAccountAmount = new UpdateTransactionAccountAmount(
      this.repositoryFactory
    );

    this.messageProvider.onMessage(
      "accounts.updated-amount",
      updateTransactionAccountAmount.execute.bind(
        updateTransactionAccountAmount
      )
    );
  }
}
