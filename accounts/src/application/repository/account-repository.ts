import { Account } from "../../domain/entity/account";

export interface AccountRepository {
  create: (account: Account) => Promise<void>;
  findByEmail: (email: string) => Promise<Account | undefined>;
}
