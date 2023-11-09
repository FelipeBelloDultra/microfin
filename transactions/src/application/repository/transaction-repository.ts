import { Transaction } from "../../domain/entity/transaction";

export interface TransactionRepository {
  create: (transaction: Transaction) => Promise<void>;
  findById: (transactionId: string) => Promise<Transaction | undefined>;
  update: (transaction: Transaction) => Promise<void>;
}
