import { Request, Response } from "express";

import { UpdateAccountAmount } from "../../../application/use-cases";

export class UpdateAccountAmountController {
  constructor(private readonly updateAccountAmount: UpdateAccountAmount) {}

  public async handle(req: Request, res: Response) {
    const { amount } = req.body;
    const { id } = req.user;

    if (!amount || typeof amount !== "number") {
      throw new Error("amount must be a number");
    }

    await this.updateAccountAmount.execute({
      accountId: id,
      newAccountAmount: amount,
    });

    return res.status(201).end();
  }
}
