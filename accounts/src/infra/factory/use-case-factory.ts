import { MessageProviderFactory } from "../../application/factory/message-provider-factory";
import { RepositoryFactory } from "../../application/factory/repository-factory";

import {
  AuthenticateAccount,
  CreateAccount,
  ShowAuthenticated,
  UpdateAccountAmount,
  UpdateTransactionAccounts,
} from "../../application/use-cases";

export class UseCaseFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory
  ) {}

  public updateAccountAmount(): UpdateAccountAmount {
    return new UpdateAccountAmount(
      this.repositoryFactory,
      this.messageProviderFactory
    );
  }

  public createAccount(): CreateAccount {
    return new CreateAccount(
      this.repositoryFactory,
      this.messageProviderFactory
    );
  }

  public updateTransactionAccounts(): UpdateTransactionAccounts {
    return new UpdateTransactionAccounts(this.repositoryFactory);
  }

  public authenticateAccount(): AuthenticateAccount {
    return new AuthenticateAccount(this.repositoryFactory);
  }

  public showAuthenticated(): ShowAuthenticated {
    return new ShowAuthenticated(this.repositoryFactory);
  }
}
