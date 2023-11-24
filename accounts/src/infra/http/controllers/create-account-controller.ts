import { Request, Response } from "express";

import { CreateAccount } from "../../../application/use-cases";

export class CreateAccountController {
  constructor(private readonly createAccount: CreateAccount) {}

  public async handle(req: Request, res: Response) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      throw new Error("email, password and name must be provided");
    }

    await this.createAccount.execute({
      email,
      name,
      password,
    });

    return res.status(201).end();
  }
}
