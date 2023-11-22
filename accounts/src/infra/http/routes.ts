import { Router as ExpressRouter } from "express";
import { ensureAuthenticatedMiddleware } from "./middlewares/ensure-authenticated";
import { UseCaseFactory } from "../factory/use-case-factory";

export class Router {
  private readonly router: ExpressRouter;

  constructor(private readonly useCaseFactory: UseCaseFactory) {
    this.router = ExpressRouter();
  }

  private showAuthenticated() {
    const showAuthenticated = this.useCaseFactory.showAuthenticated();

    this.router.get(
      "/account/session/me",
      ensureAuthenticatedMiddleware,
      async (req, res) => {
        const { email, id } = req.user;

        const result = await showAuthenticated.execute({ email, id });

        return res.json({ data: result }).status(200);
      }
    );
  }

  private authenticateAccount() {
    const authenticateAccount = this.useCaseFactory.authenticateAccount();

    this.router.post("/account/session", async (req, res) => {
      const { email, password } = req.body;

      const result = await authenticateAccount.execute({ email, password });

      return res.json({ data: result }).status(200);
    });
  }

  private updateAccountAmount() {
    const updateAccountAmount = this.useCaseFactory.updateAccountAmount();

    this.router.patch(
      "/account/amount",
      ensureAuthenticatedMiddleware,
      async (req, res) => {
        const { amount } = req.body;
        const { id } = req.user;

        await updateAccountAmount.execute({
          accountId: id,
          newAccountAmount: amount,
        });

        return res.status(201).end();
      }
    );
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
    this.showAuthenticated();
    this.authenticateAccount();
    this.createAccount();
    this.updateAccountAmount();

    return this.router;
  }
}
