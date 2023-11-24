import { AppError } from "../../../../core/errors/app-error";

export class InvalidData extends AppError {
  constructor(errors: { [key: string]: Array<string> }) {
    super({
      message: "Validation failed.",
      errors,
      statusCode: 422,
    });
  }
}
