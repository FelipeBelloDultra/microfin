import { AppError } from "../../../core/errors/app-error";

export class InvalidEmailPassword extends AppError {
  constructor() {
    super({
      message: "Invalid email/password combination.",
      statusCode: 401,
    });
  }
}
