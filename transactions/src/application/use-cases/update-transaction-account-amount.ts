import { TransactionAccountRepository } from "../repository/transaction-account-repository";

interface Input {
  accountId: string;
  newAccountAmount: number;
}

export class UpdateTransactionAccountAmount {
  constructor(
    private readonly transactionAccountRepository: TransactionAccountRepository
  ) {}

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
