import { Transaction as PrismaTransaction } from "@prisma/client";
import { Transaction } from "../../domain/entity/transaction";

type DatabaseTransaction = Omit<PrismaTransaction, "created_at" | "updated_at">;

export class TransactionMapper {
  public static toPersistence(transaction: Transaction): DatabaseTransaction {
    return {
      transaction_from_account_id: transaction.accountFrom,
      id: transaction.id,
      transaction_to_account_id: transaction.accountTo,
      status: transaction.status,
      observation: transaction.observation || null,
      value: transaction.value,
    };
  }

  public static toDomain(raw: DatabaseTransaction) {
    return Transaction.create(
      {
        accountFrom: raw.transaction_from_account_id,
        accountTo: raw.transaction_to_account_id,
        status: raw.status,
        observation: raw.observation || undefined,
        value: raw.value,
      },
      raw.id
    );
  }
}
