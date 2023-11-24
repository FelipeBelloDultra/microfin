import { Router as ExpressRouter } from "express";

import { UseCaseFactory } from "../factory/use-case-factory";
import { ensureAuthenticatedMiddleware, validateRequest } from "./middlewares";
import {
  CreateAccountController,
  UpdateAccountAmountController,
  ShowAuthenticatedController,
  AuthenticateAccountController,
} from "./controllers";

export class Router {
  private readonly router: ExpressRouter;

  constructor(private readonly useCaseFactory: UseCaseFactory) {
    this.router = ExpressRouter();
  }

  private showAuthenticated() {
    const showAuthenticatedController = new ShowAuthenticatedController(
      this.useCaseFactory.showAuthenticated()
    );

    this.router.get(
      "/accounts/session/me",
      ensureAuthenticatedMiddleware,
      showAuthenticatedController.handle.bind(showAuthenticatedController)
    );
  }

  private authenticateAccount() {
    const authenticateAccountController = new AuthenticateAccountController(
      this.useCaseFactory.authenticateAccount()
    );

    this.router.post(
      "/accounts/session",
      validateRequest.authenticateAccount,
      authenticateAccountController.handle.bind(authenticateAccountController)
    );
  }

  private updateAccountAmount() {
    const updateAccountAmountController = new UpdateAccountAmountController(
      this.useCaseFactory.updateAccountAmount()
    );

    this.router.patch(
      "/accounts/amount",
      ensureAuthenticatedMiddleware,
      validateRequest.updateAmount,
      updateAccountAmountController.handle.bind(updateAccountAmountController)
    );
  }

  private createAccount() {
    const createAccountController = new CreateAccountController(
      this.useCaseFactory.createAccount()
    );

    this.router.post(
      "/accounts",
      validateRequest.createAccount,
      createAccountController.handle.bind(createAccountController)
    );
  }

  public all() {
    this.showAuthenticated();
    this.authenticateAccount();
    this.createAccount();
    this.updateAccountAmount();

    return this.router;
  }
}
