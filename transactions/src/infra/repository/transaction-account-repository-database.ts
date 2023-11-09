import { AccountMapper } from "../../application/mappers/transaction-account-mapper";
import { TransactionAccountRepository } from "../../application/repository/transaction-account-repository";
import { TransactionAccount } from "../../domain/entity/transaction-account";
import { Database } from "../database/database";

export class TransactionAccountRepositoryDatabase
  implements TransactionAccountRepository
{
  constructor(private readonly database: Database) {}

  public async create(transactionAccount: TransactionAccount) {
    const toPersistence = AccountMapper.toPersistence(transactionAccount);

    await this.database.client.account.create({
      data: toPersistence,
    });
  }
}
