import { Request, Response } from "express";

import { CreateAccount } from "../../../application/use-cases";
import { AppError } from "../../../core/errors/app-error";

export class CreateAccountController {
  constructor(private readonly createAccount: CreateAccount) {}

  public async handle(req: Request, res: Response) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      throw new AppError({
        statusCode: 422,
        message: "Validation failed.",
        errors: {
          ...(!email && {
            email: ["Email is required."],
          }),
          ...(!name && {
            name: ["Name is required."],
          }),
          ...(!password && {
            password: ["Password is required."],
          }),
        },
      });
    }

    await this.createAccount.execute({
      email,
      name,
      password,
    });

    return res.status(201).end();
  }
}
