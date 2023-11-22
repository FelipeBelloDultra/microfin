import { RepositoryFactory } from "../factory/repository-factory";
import { CacheProvider } from "../providers/cache-provider";
import { ListTransactionsByAccountIdQuery } from "../query/transactions-query";
import { TransactionRepository } from "../repository/transaction-repository";

interface Input {
  accountId: string;
  type?: "sent" | "received";
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

  public async execute({ accountId, type = "sent" }: Input) {
    let transactions =
      await this.cacheProvider.getByKey<ListTransactionsByAccountIdQuery>(
        `transactions:${accountId}:${type}`
      );

    if (!transactions) {
      transactions = await this.transactionRepository.listByClientId(
        accountId,
        type
      );

      await this.cacheProvider.save(
        `transactions:${accountId}:${type}`,
        transactions
      );
    }

    return transactions;
  }
}
