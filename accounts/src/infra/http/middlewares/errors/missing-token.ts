import { AppError } from "../../../../core/errors/app-error";

export class MissingToken extends AppError {
  constructor() {
    super({
      message: "Missing token.",
      statusCode: 401,
    });
  }
}
