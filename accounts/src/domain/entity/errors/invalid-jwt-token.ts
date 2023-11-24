import { AppError } from "../../../core/errors/app-error";

export class InvalidJwtToken extends AppError {
  constructor() {
    super({
      message: "Invalid jwt token.",
      statusCode: 403,
    });
  }
}
