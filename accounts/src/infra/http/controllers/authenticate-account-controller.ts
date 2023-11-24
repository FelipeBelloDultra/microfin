import { Request, Response } from "express";

import { AuthenticateAccount } from "../../../application/use-cases";
import { AppError } from "../../../core/errors/app-error";

export class AuthenticateAccountController {
  constructor(private readonly authenticateAccount: AuthenticateAccount) {}

  public async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError({
        statusCode: 422,
        message: "Validation failed.",
        errors: {
          ...(!email && {
            email: ["Email is required."],
          }),
          ...(!password && {
            password: ["Password is required."],
          }),
        },
      });
    }

    const result = await this.authenticateAccount.execute({ email, password });

    return res.json({ data: result }).status(200);
  }
}
