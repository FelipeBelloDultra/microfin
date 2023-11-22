import { Router as ExpressRouter } from "express";
import { ensureAuthenticatedMiddleware } from "./middlewares/ensure-authenticated";
import { UseCaseFactory } from "../factory/use-case-factory";
import { ListTransactionsByAccountIdController } from "./controllers/list-transactions-by-account-id-controller";
import { CreateTransactionController } from "./controllers/create-transaction-controller";

export class Router {
  private readonly router: ExpressRouter;

  constructor(private readonly useCaseFactory: UseCaseFactory) {
    this.router = ExpressRouter();
  }

  private listTransactionsByAccountId() {
    const listTransactionsByAccountIdController =
      new ListTransactionsByAccountIdController(
        this.useCaseFactory.listTransactionsByAccountId()
      );

    this.router.get(
      "/transactions",
      ensureAuthenticatedMiddleware,
      listTransactionsByAccountIdController.handle.bind(
        listTransactionsByAccountIdController
      )
    );
  }

  private createTransaction() {
    const createTransactionController = new CreateTransactionController(
      this.useCaseFactory.createTransaction()
    );

    this.router.post(
      "/transaction",
      ensureAuthenticatedMiddleware,
      createTransactionController.handle.bind(createTransactionController)
    );
  }

  public all() {
    this.listTransactionsByAccountId();
    this.createTransaction();
    return this.router;
  }
}
