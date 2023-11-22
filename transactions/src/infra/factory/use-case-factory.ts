import { MessageProviderFactory } from "../../application/factory/message-provider-factory";
import { RepositoryFactory } from "../../application/factory/repository-factory";
import { CacheProvider } from "../../application/providers/cache-provider";
import { CreateTransaction } from "../../application/use-cases/create-transaction";
import { CreateTransactionAccount } from "../../application/use-cases/create-transaction-account";
import { ProcessTransaction } from "../../application/use-cases/process-transcation";
import { UpdateTransactionAccountAmount } from "../../application/use-cases/update-transaction-account-amount";
import { ListTransactionsByAccountId } from "../../application/use-cases/list-transactions-by-account-id";

export class UseCaseFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory,
    private readonly cacheProvider: CacheProvider
  ) {}

  public listTransactionsByAccountId(): ListTransactionsByAccountId {
    return new ListTransactionsByAccountId(
      this.repositoryFactory,
      this.cacheProvider
    );
  }

  public createTransactionAccount(): CreateTransactionAccount {
    return new CreateTransactionAccount(this.repositoryFactory);
  }

  public createTransaction(): CreateTransaction {
    return new CreateTransaction(
      this.repositoryFactory,
      this.messageProviderFactory,
      this.cacheProvider
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
