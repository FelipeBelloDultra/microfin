import { RepositoryFactory } from "../factory/repository-factory";
import { AccountRepository } from "../repository/account-repository";

interface AccountData {
  id: string;
  newValue: number;
}

interface Input {
  fromAccount: AccountData;
  toAccount: AccountData;
}

export class UpdateTransactionAccounts {
  private readonly accountRepository: AccountRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.accountRepository = repositoryFactory.createAccountRepository();
  }

  public async execute({ fromAccount, toAccount }: Input) {
    const [findedToAccount, findedFromAccount] = await Promise.all([
      this.accountRepository.findById(toAccount.id),
      this.accountRepository.findById(fromAccount.id),
    ]);

    if (!findedToAccount || !findedFromAccount)
      throw new Error("Account not found");

    findedToAccount.updateAmountValue(toAccount.newValue);
    findedFromAccount.updateAmountValue(fromAccount.newValue);

    await Promise.all([
      this.accountRepository.update(findedToAccount),
      this.accountRepository.update(findedFromAccount),
    ]);
  }
}
