import { TransactionAccount } from "../../domain/entity/transaction-account";
import { RepositoryFactory } from "../factory/repository-factory";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";

interface Input {
  email: string;
  externalAccountId: string;
  amount: number;
}

export class CreateTransactionAccount {
  private readonly transactionAccountRepository: TransactionAccountRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.transactionAccountRepository =
      repositoryFactory.createTransactionAccountRepository();
  }

  public async execute({ email, amount, externalAccountId }: Input) {
    const account = TransactionAccount.create({
      externalAccountId,
      email,
      amount,
    });

    await this.transactionAccountRepository.create(account);
  }
}
