import { Request, Response } from "express";

import { AuthenticateAccount } from "../../../application/use-cases/authenticate-account";

export class AuthenticateAccountController {
  constructor(private readonly authenticateAccount: AuthenticateAccount) {}

  public async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await this.authenticateAccount.execute({ email, password });

    return res.json({ data: result }).status(200);
  }
}
