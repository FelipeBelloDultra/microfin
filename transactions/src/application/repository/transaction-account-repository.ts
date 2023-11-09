import { TransactionAccount } from "../../domain/entity/transaction-account";

export interface TransactionAccountRepository {
  create: (account: TransactionAccount) => Promise<void>;
}
