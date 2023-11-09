import { AccountMapper } from "../../application/mappers/account-mapper";
import { AccountRepository } from "../../application/repository/account-repository";
import { Account } from "../../domain/entity/account";
import { Database } from "../database/database";

export class AccountRepositoryDatabase implements AccountRepository {
  constructor(private readonly database: Database) {}

  public async create(account: Account) {
    const toPersistence = AccountMapper.toPersistence(account);

    await this.database.client.account.create({
      data: toPersistence,
    });
  }

  public async findByEmail(email: string) {
    const finded = await this.database.client.account.findUnique({
      where: {
        email,
      },
    });

    if (finded) return AccountMapper.toDomain(finded);

    return undefined;
  }

  public async findById(id: string) {
    const finded = await this.database.client.account.findUnique({
      where: {
        id,
      },
    });

    if (finded) return AccountMapper.toDomain(finded);

    return undefined;
  }

  public async update(account: Account) {
    await this.database.client.account.update({
      where: {
        id: account.id,
      },
      data: AccountMapper.toPersistence(account),
    });
  }
}
