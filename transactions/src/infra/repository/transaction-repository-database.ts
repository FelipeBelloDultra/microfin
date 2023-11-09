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

  public async findById(id: string) {
    const finded = await this.database.client.transaction.findUnique({
      where: {
        id,
      },
    });

    if (finded) return TransactionMapper.toDomain(finded);

    return undefined;
  }

  public async update(transaction: Transaction) {
    await this.database.client.transaction.update({
      where: {
        id: transaction.id,
      },
      data: TransactionMapper.toPersistence(transaction),
    });
  }
}
