import { Pagination } from "../../domain/entity/pagination";
import { Transaction } from "../../domain/entity/transaction";
import { ListTransactionsByAccountIdQuery } from "../query/transactions-query";

export interface TransactionRepository {
  create: (transaction: Transaction) => Promise<void>;
  findById: (transactionId: string) => Promise<Transaction | undefined>;
  update: (transaction: Transaction) => Promise<void>;
  listByClientId: (
    clientId: string,
    pagination: {
      type: "sent" | "received";
      skip: number;
      take: number;
    }
  ) => Promise<Pagination<ListTransactionsByAccountIdQuery>>;
}
