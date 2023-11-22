type Account = {
  id: string;
  external_account_id: string;
  email: string;
};

export type ListTransactionsByAccountIdQuery = Array<{
  id: string;
  value: number;
  observation: string | null;
  status: "PENDING" | "COMPLETED" | "REFUSED";
  transaction_to_account_id: string;
  transaction_to_account: Account;
  transaction_from_account_id: string;
  transaction_from_account: Account;
  created_at: Date;
  updated_at: Date;
}>;
