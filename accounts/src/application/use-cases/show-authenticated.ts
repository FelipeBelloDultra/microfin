import { RepositoryFactory } from "../factory/repository-factory";
import { AccountRepository } from "../repository/account-repository";
import { UserNotFound } from "./errors/user-not-found";

interface Input {
  id: string;
  email: string;
}

export class ShowAuthenticated {
  private readonly accountRepository: AccountRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.accountRepository = repositoryFactory.createAccountRepository();
  }

  public async execute({ id, email }: Input) {
    const account = await this.accountRepository.findById(id);
    if (!account || account.email !== email) {
      throw new UserNotFound();
    }

    return {
      id: account.id,
      name: account.name,
      email: account.email,
      amount: account.amount,
    };
  }
}
