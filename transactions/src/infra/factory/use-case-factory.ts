import { MessageProviderFactory } from "../../application/factory/message-provider-factory";
import { RepositoryFactory } from "../../application/factory/repository-factory";
import { CacheProvider } from "../../application/providers/cache-provider";

import {
  CreateTransaction,
  CreateTransactionAccount,
  ProcessTransaction,
  UpdateTransactionAccountAmount,
  ListTransactionsByAccountId,
} from "../../application/use-cases";

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
