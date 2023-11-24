import { AppError } from "../../../core/errors/app-error";

export class InvalidAccount extends AppError {
  constructor() {
    super({ message: "Invalid account.", statusCode: 422 });
  }
}
