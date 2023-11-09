import { Account as PrismaAccount } from "@prisma/client";
import { Account } from "../../domain/entity/account";
import { MoneyService } from "../../domain/service/money-service";

type DatabaseAccount = Omit<PrismaAccount, "created_at" | "updated_at">;

export class AccountMapper {
  public static toPersistence(account: Account): DatabaseAccount {
    return {
      amount: MoneyService.toCents(account.amount),
      code: account.code || null,
      email: account.email,
      id: `account:${account.id}`,
      name: account.name,
      password: account.password,
    };
  }

  public static toDomain(raw: DatabaseAccount) {
    return Account.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        code: raw.code || undefined,
        amount: MoneyService.toReal(raw.amount),
      },
      raw.id
    );
  }
}
