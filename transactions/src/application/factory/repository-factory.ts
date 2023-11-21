import { TransactionAccountRepository } from "../repository/transaction-account-repository";
import { TransactionRepository } from "../repository/transaction-repository";

export interface RepositoryFactory {
  createTransactionAccountRepository: () => TransactionAccountRepository;
  createTransactionRepository: () => TransactionRepository;
}
