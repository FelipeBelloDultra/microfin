import { MessageProviderFactory } from "../../application/factory/message-provider-factory";
import { RepositoryFactory } from "../../application/factory/repository-factory";
import { CreateAccount } from "../../application/use-cases/create-account";
import { UpdateAccountAmount } from "../../application/use-cases/update-account-amount";
import { UpdateTransactionAccounts } from "../../application/use-cases/update-transaction-accounts";

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
}