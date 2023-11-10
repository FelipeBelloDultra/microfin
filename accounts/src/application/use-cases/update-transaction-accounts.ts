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
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute({ fromAccount, toAccount }: Input) {
    const findedToAccount = await this.accountRepository.findById(toAccount.id);
    if (!findedToAccount) throw new Error("Account not found");
    findedToAccount.updateAmountValue(toAccount.newValue);

    const findedFromAccount = await this.accountRepository.findById(
      fromAccount.id
    );
    if (!findedFromAccount) throw new Error("Account not found");
    findedFromAccount.updateAmountValue(fromAccount.newValue);

    await this.accountRepository.update(findedToAccount);
    await this.accountRepository.update(findedFromAccount);
  }
}
