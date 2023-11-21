import { RepositoryFactory } from "../../application/factory/repository-factory";
import { TransactionAccountRepository } from "../../application/repository/transaction-account-repository";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { TransactionRepositoryDatabase } from "../repository/transaction-repository-database";
import { TransactionAccountRepositoryDatabase } from "../repository/transaction-account-repository-database";
import { Database } from "../database/database";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly database: Database) {}

  public createTransactionAccountRepository(): TransactionAccountRepository {
    return new TransactionAccountRepositoryDatabase(this.database);
  }

  public createTransactionRepository(): TransactionRepository {
    return new TransactionRepositoryDatabase(this.database);
  }
}
