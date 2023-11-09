import { TransactionMapper } from "../../application/mappers/transaction-mapper";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { Transaction } from "../../domain/entity/transaction";
import { Database } from "../database/database";

export class TransactionRepositoryDatabase implements TransactionRepository {
  constructor(private readonly database: Database) {}

  public async create(transaction: Transaction) {
    const toPersistence = TransactionMapper.toPersistence(transaction);

    await this.database.client.transaction.create({
      data: toPersistence,
    });
  }
}
