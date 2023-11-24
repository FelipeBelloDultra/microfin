import { Request, Response } from "express";

import { UpdateAccountAmount } from "../../../application/use-cases";
import { AppError } from "../../../core/errors/app-error";

export class UpdateAccountAmountController {
  constructor(private readonly updateAccountAmount: UpdateAccountAmount) {}

  public async handle(req: Request, res: Response) {
    const { amount } = req.body;
    const { id } = req.user;

    if (!amount || typeof amount !== "number") {
      throw new AppError({
        statusCode: 422,
        message: "Validation failed.",
        errors: {
          ...(!amount && {
            amount: ["Amount must be a number."],
          }),
        },
      });
    }

    await this.updateAccountAmount.execute({
      accountId: id,
      newAccountAmount: amount,
    });

    return res.status(201).end();
  }
}
