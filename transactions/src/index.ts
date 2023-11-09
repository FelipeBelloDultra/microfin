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

  new MessageProviderController(messageProvider, transactionAccountRepository);

  const createT = new CreateTransaction(
    transactionRepository,
    transactionAccountRepository,
    messageProvider
  );

  await createT.execute({
    accountFrom: "account:b333f0e3-9494-4995-a74f-f848fe310e5a",
    accountTo: "account:746da863-9d0b-419d-b9ac-8e15283066f8",
    type: "TRANSFER",
    value: 20,
  });
})();
