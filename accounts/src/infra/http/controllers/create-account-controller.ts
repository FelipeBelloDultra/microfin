import { Request, Response } from "express";

import { CreateAccount } from "../../../application/use-cases";

export class CreateAccountController {
  constructor(private readonly createAccount: CreateAccount) {}

  public async handle(req: Request, res: Response) {
    const { email, name, password } = req.body;

    await this.createAccount.execute({
      email,
      name,
      password,
    });

    return res.status(201).end();
  }
}
