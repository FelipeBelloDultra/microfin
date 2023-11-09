import { PrismaClient as DatabaseClient } from "@prisma/client";

export interface Database {
  connect: () => Promise<void>;
  readonly client: DatabaseClient;
}
