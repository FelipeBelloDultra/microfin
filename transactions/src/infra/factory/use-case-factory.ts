import { MessageProviderFactory } from "../../application/factory/message-provider-factory";
import { RepositoryFactory } from "../../application/factory/repository-factory";
import { CreateTransaction } from "../../application/use-cases/create-transaction";
import { CreateTransactionAccount } from "../../application/use-cases/create-transaction-account";
import { ProcessTransaction } from "../../application/use-cases/process-transcation";
import { UpdateTransactionAccountAmount } from "../../application/use-cases/update-transaction-account-amount";

export class UseCaseFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory
  ) {}

  public createTransactionAccount(): CreateTransactionAccount {
    return new CreateTransactionAccount(this.repositoryFactory);
  }

  public createTransaction(): CreateTransaction {
    return new CreateTransaction(
      this.repositoryFactory,
      this.messageProviderFactory
    );
  }

  public processTransaction(): ProcessTransaction {
    return new ProcessTransaction(
      this.repositoryFactory,
      this.messageProviderFactory
    );
  }

  public updateTransactionAccountAmount(): UpdateTransactionAccountAmount {
    return new UpdateTransactionAccountAmount(this.repositoryFactory);
  }
}
