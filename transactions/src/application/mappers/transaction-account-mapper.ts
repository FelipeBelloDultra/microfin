import { Account as PrismaAccount } from "@prisma/client";
import { TransactionAccount } from "../../domain/entity/transaction-account";

type DatabaseAccount = Omit<PrismaAccount, "created_at" | "updated_at">;

export class TransactionAccountMapper {
  public static toPersistence(account: TransactionAccount): DatabaseAccount {
    return {
      amount: account.amount,
      external_account_id: account.externalAccountId,
      email: account.email,
      id: account.id,
    };
  }

  public static toDomain(raw: DatabaseAccount) {
    return TransactionAccount.create(
      {
        email: raw.email,
        amount: raw.amount,
        externalAccountId: raw.external_account_id,
      },
      raw.id
    );
  }
}
