import { Transaction } from "../../domain/entity/transaction";
import { ListTransactionsByAccountIdQuery } from "../query/transactions-query";

export interface TransactionRepository {
  create: (transaction: Transaction) => Promise<void>;
  findById: (transactionId: string) => Promise<Transaction | undefined>;
  update: (transaction: Transaction) => Promise<void>;
  listByClientId: (
    clientId: string,
    type?: "sent" | "received"
  ) => Promise<ListTransactionsByAccountIdQuery>;
}
