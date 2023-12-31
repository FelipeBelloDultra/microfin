import { TransactionMapper } from "../../application/mappers/transaction-mapper";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { Pagination } from "../../domain/entity/pagination";
import { Transaction } from "../../domain/entity/transaction";
import { Database } from "../database/database";

export class TransactionRepositoryDatabase implements TransactionRepository {
  constructor(private readonly database: Database) {}

  public async listByClientId(
    clientId: string,
    pagination: {
      type: "sent" | "received";
      skip: number;
      take: number;
    }
  ) {
    const { skip, take, type } = pagination;

    const condition =
      type === "received"
        ? { transaction_to_account_id: clientId }
        : { transaction_from_account_id: clientId };

    const [transactionsCount, transactions] = await Promise.all([
      this.database.client.transaction.count({
        where: condition,
      }),
      this.database.client.transaction.findMany({
        where: condition,
        skip,
        take,
        include: {
          transaction_to_account: {
            select: {
              email: true,
              id: true,
              external_account_id: true,
            },
          },
          transaction_from_account: {
            select: {
              email: true,
              id: true,
              external_account_id: true,
            },
          },
        },
        orderBy: {
          updated_at: "desc",
        },
      }),
    ]);

    return Pagination.create({
      result: transactions,
      total: transactionsCount,
    });
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
