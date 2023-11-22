import { Request, Response } from "express";

import { ListTransactionsByAccountId } from "../../../application/use-cases";

export class ListTransactionsByAccountIdController {
  constructor(
    private readonly listTransactionsByAccountId: ListTransactionsByAccountId
  ) {}

  public async handle(req: Request, res: Response) {
    let { type } = req.query;
    const { id } = req.user;

    if (typeof type !== "string") {
      type = "sent";
    }

    const transactions = await this.listTransactionsByAccountId.execute({
      accountId: id,
      type: type === "sent" ? type : "received",
    });

    return res
      .json({
        data: transactions,
      })
      .status(200);
  }
}
