import { Account } from "../../domain/entity/account";
import { MessageProviderFactory } from "../factory/message-provider-factory";
import { RepositoryFactory } from "../factory/repository-factory";
import { AccountRepository } from "../repository/account-repository";

interface Input {
  name: string;
  email: string;
  password: string;
}

export class CreateAccount {
  private readonly accountRepository: AccountRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly messageProviderFactory: MessageProviderFactory
  ) {
    this.accountRepository = repositoryFactory.createAccountRepository();
  }

  public async execute({ email, name, password }: Input) {
    const finded = await this.accountRepository.findByEmail(email);
    if (finded) throw new Error("Email already used");

    const account = await Account.create({
      email,
      name,
      password,
      amount: 0,
    });

    await this.accountRepository.create(account);

    await this.messageProviderFactory.emitAccountCreatedMessage({
      accountId: account.id,
      amount: account.amount,
      email: account.email,
    });
  }
}
