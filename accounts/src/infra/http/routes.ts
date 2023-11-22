import { Router as ExpressRouter } from "express";
import { ensureAuthenticatedMiddleware } from "./middlewares/ensure-authenticated";
import { UseCaseFactory } from "../factory/use-case-factory";
import { CreateAccountController } from "./controllers/create-account-controller";
import { UpdateAccountAmountController } from "./controllers/update-account-amount-controller";
import { ShowAuthenticatedController } from "./controllers/show-authenticated-controller";
import { AuthenticateAccountController } from "./controllers/authenticate-account-controller";

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
      "/account/session/me",
      ensureAuthenticatedMiddleware,
      showAuthenticatedController.handle.bind(showAuthenticatedController)
    );
  }

  private authenticateAccount() {
    const authenticateAccountController = new AuthenticateAccountController(
      this.useCaseFactory.authenticateAccount()
    );

    this.router.post(
      "/account/session",
      authenticateAccountController.handle.bind(authenticateAccountController)
    );
  }

  private updateAccountAmount() {
    const updateAccountAmountController = new UpdateAccountAmountController(
      this.useCaseFactory.updateAccountAmount()
    );

    this.router.patch(
      "/account/amount",
      ensureAuthenticatedMiddleware,
      updateAccountAmountController.handle.bind(updateAccountAmountController)
    );
  }

  private createAccount() {
    const createAccountController = new CreateAccountController(
      this.useCaseFactory.createAccount()
    );

    this.router.post(
      "/account",
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
