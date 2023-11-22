import { Request, Response } from "express";

import { UpdateAccountAmount } from "../../../application/use-cases/update-account-amount";

export class UpdateAccountAmountController {
  constructor(private readonly updateAccountAmount: UpdateAccountAmount) {}

  public async handle(req: Request, res: Response) {
    const { amount } = req.body;
    const { id } = req.user;

    await this.updateAccountAmount.execute({
      accountId: id,
      newAccountAmount: amount,
    });

    return res.status(201).end();
  }
}
