import { TransactionMapper } from "../../application/mappers/transaction-mapper";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { Transaction } from "../../domain/entity/transaction";
import { Database } from "../database/database";

export class TransactionRepositoryDatabase implements TransactionRepository {
  constructor(private readonly database: Database) {}

  public async listByClientId(
    clientId: string,
    type: "sent" | "received" = "received"
  ) {
    const condition =
      type === "received"
        ? { transaction_to_account_id: clientId }
        : { transaction_from_account_id: clientId };

    const transactions = await this.database.client.transaction.findMany({
      where: condition,
      include: {
        transaction_to_account: true,
        transaction_from_account: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    return transactions;
  }

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
