import { MessageProvider } from "../../application/providers/message-provider";
import { TransactionAccountRepository } from "../../application/repository/transaction-account-repository";
import { CreateTransactionAccount } from "../../application/use-cases/create-transaction-account";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly transactionAccountRepository: TransactionAccountRepository
  ) {
    this.createTransactionAccount();
  }

  public async createTransactionAccount() {
    const createTransactionAccount = new CreateTransactionAccount(
      this.transactionAccountRepository
    );

    this.messageProvider.onMessage<{
      email: string;
      code?: string;
      externalAccountId: string;
      amount: number;
    }>("account.created", createTransactionAccount.execute);
  }
}
