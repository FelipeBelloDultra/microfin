import { Transaction as PrismaTransaction } from "@prisma/client";
import { Transaction } from "../../domain/entity/transaction";
import { MoneyService } from "../../domain/service/money-service";

type DatabaseTransaction = Omit<PrismaTransaction, "created_at" | "updated_at">;

export class TransactionMapper {
  public static toPersistence(transaction: Transaction): DatabaseTransaction {
    return {
      transaction_from_account_id: transaction.accountFrom,
      id: transaction.id,
      transaction_to_account_id: transaction.accountTo,
      status: transaction.status,
      type: transaction.type,
      value: MoneyService.toCents(transaction.value),
    };
  }

  public static toDomain(raw: DatabaseTransaction) {
    return Transaction.create(
      {
        accountFrom: raw.transaction_from_account_id,
        accountTo: raw.transaction_to_account_id,
        status: raw.status,
        type: raw.type,
        value: MoneyService.toReal(raw.value),
      },
      raw.id
    );
  }
}
