import { Request, Response } from "express";

import { CreateTransaction } from "../../../application/use-cases";

export class CreateTransactionController {
  constructor(private readonly createTransaction: CreateTransaction) {}

  public async handle(req: Request, res: Response) {
    const { accountTo, value } = req.body;
    const { id } = req.user;

    await this.createTransaction.execute({
      accountFrom: id,
      accountTo,
      value,
    });

    return res.status(201).end();
  }
}
