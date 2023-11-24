import { AppError } from "../../../core/errors/app-error";

export class EmailAlreadyUsed extends AppError {
  constructor() {
    super({
      message: "Email already used.",
      errors: {
        email: ["Email already used."],
      },
    });
  }
}
