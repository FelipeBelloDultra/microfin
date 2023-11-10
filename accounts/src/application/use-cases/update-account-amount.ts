import { MessageProvider } from "../providers/message-provider";
import { AccountRepository } from "../repository/account-repository";

interface Input {
  accountId: string;
  newAccountAmount: number;
}

export class UpdateAccountAmount {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly messageProvider: MessageProvider
  ) {}

  public async execute({ accountId, newAccountAmount }: Input) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new Error("Account not found");

    account.updateAmountValue(newAccountAmount);

    await this.accountRepository.update(account);
    await this.messageProvider.sendMessage(
      "accounts.updated-amount",
      Buffer.from(
        JSON.stringify({
          accountId,
          newAccountAmount,
        })
      )
    );
  }
}
