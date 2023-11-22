import { Jwt } from "../../domain/entity/jwt";
import { RepositoryFactory } from "../factory/repository-factory";
import { AccountRepository } from "../repository/account-repository";

interface Input {
  email: string;
  password: string;
}

export class AuthenticateAccount {
  private readonly accountRepository: AccountRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.accountRepository = repositoryFactory.createAccountRepository();
  }

  public async execute({ email, password }: Input) {
    const findedAccountByEmail = await this.accountRepository.findByEmail(
      email
    );
    if (!findedAccountByEmail) {
      throw new Error("Invalid email/password combination");
    }

    const passwordIsEqual = await findedAccountByEmail.comparePasswordHash(
      password
    );
    if (!passwordIsEqual) {
      throw new Error("Invalid email/password combination");
    }

    const jwt = Jwt.signIn({
      id: findedAccountByEmail.id,
      email: findedAccountByEmail.email,
    });

    return jwt;
  }
}
