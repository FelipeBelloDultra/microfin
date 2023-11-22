import { Pagination } from "../../domain/entity/pagination";
import { RepositoryFactory } from "../factory/repository-factory";
import { CacheProvider } from "../providers/cache-provider";
import { ListTransactionsByAccountIdQuery } from "../query/transactions-query";
import { TransactionRepository } from "../repository/transaction-repository";

interface Input {
  accountId: string;
  pagination: {
    type: "sent" | "received";
    skip: number;
    take: number;
  };
}

export class ListTransactionsByAccountId {
  private readonly transactionRepository: TransactionRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly cacheProvider: CacheProvider
  ) {
    this.transactionRepository =
      repositoryFactory.createTransactionRepository();
  }

  public async execute({ accountId, pagination }: Input) {
    const { skip, take, type } = pagination;

    let transactions = await this.cacheProvider.getByKey<
      Pagination<ListTransactionsByAccountIdQuery>
    >(`transactions:${accountId}:type-${type}:skip-${skip}:take-${take}`);

    if (!transactions) {
      transactions = await this.transactionRepository.listByClientId(
        accountId,
        {
          skip,
          take,
          type,
        }
      );

      await this.cacheProvider.save(
        `transactions:${accountId}:type-${type}:skip-${skip}:take-${take}`,
        transactions
      );
    }

    return transactions;
  }
}
