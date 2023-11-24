import { AppError } from "../../../core/errors/app-error";

export class InvalidAmount extends AppError {
  constructor(message: string) {
    super({
      message,
      statusCode: 422,
      errors: {
        amount: [message],
      },
    });
  }
}
