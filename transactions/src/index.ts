import { MessageProviderFactory } from "./application/factory/message-provider-factory";
import { RedisCacheProviderAdapter } from "./infra/cache-provider/redis-cache-provider-adapter";
import { PrismaDatabaseAdapter } from "./infra/database/prisma-database-adapter";
import { DatabaseRepositoryFactory } from "./infra/factory/database-repository-factory";
import { UseCaseFactory } from "./infra/factory/use-case-factory";
import { Router } from "./infra/http/routes";
import { Server } from "./infra/http/server";
import { MessageProviderController } from "./infra/message-provider/message-provider-controller";
import { RabbitmqMessageProviderAdapter } from "./infra/message-provider/rabbitmq-message-provider-adapter";

(async () => {
  const redisCache = new RedisCacheProviderAdapter();
  await redisCache.connect();

  const rabbitmqMessage = new RabbitmqMessageProviderAdapter();
  await rabbitmqMessage.connect();

  const messageProviderFactory = new MessageProviderFactory(rabbitmqMessage);

  const prismaDatabase = new PrismaDatabaseAdapter();
  await prismaDatabase.connect();

  const repositoryFactory = new DatabaseRepositoryFactory(prismaDatabase);

  const useCaseFactory = new UseCaseFactory(
    repositoryFactory,
    messageProviderFactory,
    redisCache
  );

  new MessageProviderController(rabbitmqMessage, useCaseFactory);

  const routes = new Router(useCaseFactory);
  const server = new Server(routes);
  server.listen();
})();
