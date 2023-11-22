import { Request, Response } from "express";

import { ListTransactionsByAccountId } from "../../../application/use-cases";

export class ListTransactionsByAccountIdController {
  constructor(
    private readonly listTransactionsByAccountId: ListTransactionsByAccountId
  ) {}

  public async handle(req: Request, res: Response) {
    const { skip, take, type } = req.query;

    const { id } = req.user;

    const transactions = await this.listTransactionsByAccountId.execute({
      accountId: id,
      pagination: {
        skip: Number(skip),
        take: Number(take),
        type: type === "sent" ? "sent" : "received",
      },
    });

    return res
      .json({
        data: transactions,
      })
      .status(200);
  }
}
