import { MessageProvider } from "../../application/providers/message-provider";
import { TransactionAccountRepository } from "../../application/repository/transaction-account-repository";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { CreateTransactionAccount } from "../../application/use-cases/create-transaction-account";
import { ProcessTransaction } from "../../application/use-cases/process-transcation";
import { UpdateTransactionAccountAmount } from "../../application/use-cases/update-transaction-account-amount";

export class MessageProviderController {
  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly transactionAccountRepository: TransactionAccountRepository,
    private readonly transactionRepository: TransactionRepository
  ) {
    this.createTransactionAccount();
    this.processTransaction();
    this.updateTransactionAccountAmount();
  }

  public createTransactionAccount() {
    const createTransactionAccount = new CreateTransactionAccount(
      this.transactionAccountRepository
    );

    this.messageProvider.onMessage<{
      email: string;
      externalAccountId: string;
      amount: number;
    }>(
      "account.created",
      createTransactionAccount.execute.bind(createTransactionAccount)
    );
  }

  public processTransaction() {
    const processTransaction = new ProcessTransaction(
      this.transactionRepository,
      this.transactionAccountRepository,
      this.messageProvider
    );

    this.messageProvider.onMessage(
      "transaction.process-created-transaction",
      processTransaction.execute.bind(processTransaction)
    );
  }

  public updateTransactionAccountAmount() {
    const updateTransactionAccountAmount = new UpdateTransactionAccountAmount(
      this.transactionAccountRepository
    );

    this.messageProvider.onMessage(
      "accounts.updated-amount",
      updateTransactionAccountAmount.execute.bind(
        updateTransactionAccountAmount
      )
    );
  }
}
