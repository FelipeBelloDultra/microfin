import { AppError } from "../../../core/errors/app-error";

export class TransactionNotFound extends AppError {
  constructor() {
    super({
      message: "Transaction not found.",
    });
  }
}
