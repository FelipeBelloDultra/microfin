import { AccountRepository } from "../repository/account-repository";

export interface RepositoryFactory {
  createAccountRepository: () => AccountRepository;
}
