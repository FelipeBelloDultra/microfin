import { CreateTransaction } from "./application/use-cases/create-transaction";
import { PrismaDatabaseAdapter } from "./infra/database/prisma-database-adapter";
import { MessageProviderController } from "./infra/message-provider/message-provider-controller";
import { RabbitmqMessageProviderAdapter } from "./infra/message-provider/rabbitmq-message-provider-adapter";
import { TransactionAccountRepositoryDatabase } from "./infra/repository/transaction-account-repository-database";
import { TransactionRepositoryDatabase } from "./infra/repository/transaction-repository-database";

(async () => {
  const database = new PrismaDatabaseAdapter();

  await database.connect();
  const transactionAccountRepository = new TransactionAccountRepositoryDatabase(
    database
  );
  const transactionRepository = new TransactionRepositoryDatabase(database);

  const messageProvider = new RabbitmqMessageProviderAdapter();
  await messageProvider.connect();

  new MessageProviderController(
    messageProvider,
    transactionAccountRepository,
    transactionRepository
  );

  const createT = new CreateTransaction(
    transactionRepository,
    transactionAccountRepository,
    messageProvider
  );

  await createT.execute({
    accountFrom: "account:9134e341-d43b-465a-9e85-3cd6f48002be",
    accountTo: "account:fe3a311c-ad10-47b3-be74-01b85c17c00d",
    type: "TRANSFER",
    value: 120,
  });
})();
