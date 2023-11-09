import { Account } from "../../domain/entity/account";
import { MessageProvider } from "../providers/message-provider";
import { AccountRepository } from "../repository/account-repository";

interface Input {
  name: string;
  email: string;
  password: string;
}

export class CreateAccount {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly messageProvider: MessageProvider
  ) {}

  public async execute({ email, name, password }: Input) {
    const finded = await this.accountRepository.findByEmail(email);
    if (finded) throw new Error("Email already used");

    const account = Account.create({
      email,
      name,
      password,
      amount: 0,
    });

    await this.accountRepository.create(account);

    const sendMessageData = Buffer.from(
      JSON.stringify({
        externalAccountId: account.id,
        code: account.code,
        email: account.email,
        amount: account.amount,
      })
    );

    await this.messageProvider.sendMessage("account.created", sendMessageData);
  }
}
