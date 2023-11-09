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
    accountFrom: "account:72ee5db5-c8c6-4cec-b5be-318c60dff705",
    accountTo: "account:bc4634f1-6d15-4ac8-b794-b1da66b9a677",
    value: 120,
  });
})();
