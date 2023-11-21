import { RepositoryFactory } from "../factory/repository-factory";
import { TransactionAccountRepository } from "../repository/transaction-account-repository";

interface Input {
  accountId: string;
  newAccountAmount: number;
}

export class UpdateTransactionAccountAmount {
  private readonly transactionAccountRepository: TransactionAccountRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.transactionAccountRepository =
      repositoryFactory.createTransactionAccountRepository();
  }

  public async execute({ accountId, newAccountAmount }: Input) {
    const transactionAccount =
      await this.transactionAccountRepository.findByExternalAccountId(
        accountId
      );
    if (!transactionAccount) return;

    transactionAccount.updateAmountValue(newAccountAmount);
    await this.transactionAccountRepository.update(transactionAccount);
  }
}
