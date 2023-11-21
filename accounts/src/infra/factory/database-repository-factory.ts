import { RepositoryFactory } from "../../application/factory/repository-factory";
import { AccountRepository } from "../../application/repository/account-repository";
import { AccountRepositoryDatabase } from "../repository/account-repository-database";
import { Database } from "../database/database";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly database: Database) {}

  public createAccountRepository(): AccountRepository {
    return new AccountRepositoryDatabase(this.database);
  }
}
