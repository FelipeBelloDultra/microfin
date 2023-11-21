import { TransactionAccount } from "../../domain/entity/transaction-account";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";

interface Input {
  email: string;
  externalAccountId: string;
  amount: number;
}

export class CreateTransactionAccount {
  constructor(
    private readonly transactionAccountRepository: TransactionAccountRepository
  ) {}

  public async execute({ email, amount, externalAccountId }: Input) {
    const account = TransactionAccount.create({
      externalAccountId,
      email,
      amount,
    });

    await this.transactionAccountRepository.create(account);
  }
}
