import { Router as ExpressRouter } from "express";
import { UseCaseFactory } from "../factory/use-case-factory";

export class Router {
  private readonly router: ExpressRouter;

  constructor(private readonly useCaseFactory: UseCaseFactory) {
    this.router = ExpressRouter();
  }

  private updateAccountAmount() {
    const updateAccountAmount = this.useCaseFactory.updateAccountAmount();

    this.router.post("/account/amount", async (req, res) => {
      const { accountId, amount } = req.body;

      await updateAccountAmount.execute({
        accountId,
        newAccountAmount: amount,
      });

      return res.status(201).end();
    });
  }

  private createAccount() {
    const createAccount = this.useCaseFactory.createAccount();

    this.router.post("/account", async (req, res) => {
      const { email, name, password } = req.body;

      await createAccount.execute({
        email,
        name,
        password,
      });

      return res.status(201).end();
    });
  }

  public all() {
    this.createAccount();
    this.updateAccountAmount();

    return this.router;
  }
}
