import { PrismaClient } from "@prisma/client";
import { Database } from "./database";

export class PrismaDatabaseAdapter implements Database {
  private readonly prismaClient: PrismaClient;

  public get client(): PrismaClient {
    return this.prismaClient;
  }

  constructor() {
    this.prismaClient = new PrismaClient({
      log: ["info", "query", "error"],
    });
  }

  public async connect(): Promise<void> {
    await this.prismaClient.$connect();
  }
}
