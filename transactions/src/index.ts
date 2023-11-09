import { PrismaDatabaseAdapter } from "./infra/database/prisma-database-adapter";
import { MessageProviderController } from "./infra/message-provider/message-provider-controller";
import { RabbitmqMessageProviderAdapter } from "./infra/message-provider/rabbitmq-message-provider-adapter";
import { TransactionAccountRepositoryDatabase } from "./infra/repository/transaction-account-repository-database";

(async () => {
  const database = new PrismaDatabaseAdapter();

  await database.connect();
  const repository = new TransactionAccountRepositoryDatabase(database);

  const messageProvider = new RabbitmqMessageProviderAdapter();
  await messageProvider.connect();

  new MessageProviderController(messageProvider, repository);
})();
