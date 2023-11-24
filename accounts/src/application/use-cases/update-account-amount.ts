import { MessageProviderFactory } from "../factory/message-provider-factory";
import { RepositoryFactory } from "../factory/repository-factory";
import { AccountRepository } from "../repository/account-repository";
import { UserNotFound } from "./errors/user-not-found";

interface Input {
  accountId: string;
  newAccountAmount: number;
}

export class UpdateAccountAmount {
  private readonly accountRepository: AccountRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory
  ) {
    this.accountRepository = repositoryFactory.createAccountRepository();
  }

  public async execute({ accountId, newAccountAmount }: Input) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new UserNotFound();

    account.updateAmountValue(newAccountAmount);

    await this.accountRepository.update(account);

    await this.messageProviderFactory.emitAccountUpdateAmountMessage({
      accountId,
      newAmount: newAccountAmount,
    });
  }
}
