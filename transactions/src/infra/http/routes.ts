import { Router as ExpressRouter } from "express";

import { UseCaseFactory } from "../factory/use-case-factory";
import { ensureAuthenticatedMiddleware, pagination } from "./middlewares";
import {
  ListTransactionsByAccountIdController,
  CreateTransactionController,
} from "./controllers";

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
      pagination,
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
      "/transactions",
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
