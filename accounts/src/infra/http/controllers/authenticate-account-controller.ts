import { Request, Response } from "express";

import { AuthenticateAccount } from "../../../application/use-cases";

export class AuthenticateAccountController {
  constructor(private readonly authenticateAccount: AuthenticateAccount) {}

  public async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("email and password must be provided");
    }

    const result = await this.authenticateAccount.execute({ email, password });

    return res.json({ data: result }).status(200);
  }
}
