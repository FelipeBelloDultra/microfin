import { Account as PrismaAccount } from "@prisma/client";
import { Account } from "../../domain/entity/account";

type DatabaseAccount = Omit<PrismaAccount, "created_at" | "updated_at">;

export class AccountMapper {
  public static toPersistence(account: Account): DatabaseAccount {
    return {
      amount: account.amount,
      email: account.email,
      id: account.id,
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
        amount: raw.amount,
      },
      raw.id
    );
  }
}
