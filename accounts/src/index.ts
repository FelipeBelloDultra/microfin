import { CreateAccount } from "./application/use-cases/create-account";

import { PrismaDatabaseAdapter } from "./infra/database/prisma-database-adapter";
import { RabbitmqMessageProviderAdapter } from "./infra/message-provider/rabbitmq-message-provider-adapter";
import { AccountRepositoryDatabse } from "./infra/repository/account-repository-database";

(async () => {
  const database = new PrismaDatabaseAdapter();
  await database.connect();

  const repository = new AccountRepositoryDatabse(database);
  const message = new RabbitmqMessageProviderAdapter();
  await message.connect();

  const useCase = new CreateAccount(repository, message);
  await useCase.execute({
    email: "test@test.com",
    name: "name example",
    password: "my-password",
  });
})();
