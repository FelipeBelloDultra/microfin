import { Account } from "../../domain/entity/account";

export interface AccountRepository {
  create: (account: Account) => Promise<void>;
  update: (account: Account) => Promise<void>;
  findByEmail: (email: string) => Promise<Account | undefined>;
  findById: (id: string) => Promise<Account | undefined>;
}
