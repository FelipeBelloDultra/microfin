import { Router as ExpressRouter } from "express";
import { UseCaseFactory } from "../factory/use-case-factory";

export class Router {
  private readonly router: ExpressRouter;

  constructor(private readonly useCaseFactory: UseCaseFactory) {
    this.router = ExpressRouter();
  }

  private createTransaction() {
    const createTransaction = this.useCaseFactory.createTransaction();

    this.router.post("/transaction", async (req, res) => {
      const { accountFrom, accountTo, value } = req.body;

      await createTransaction.execute({
        accountFrom,
        accountTo,
        value,
      });

      return res.status(201).end();
    });
  }

  public all() {
    this.createTransaction();
    return this.router;
  }
}
