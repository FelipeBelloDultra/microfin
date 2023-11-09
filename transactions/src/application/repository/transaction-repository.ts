import { Transaction } from "../../domain/entity/transaction";

export interface TransactionRepository {
  create: (transaction: Transaction) => Promise<void>;
}
