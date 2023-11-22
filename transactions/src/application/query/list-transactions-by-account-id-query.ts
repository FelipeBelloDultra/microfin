export type ListTransactionsByAccountIdQuery = {
  id: string;
  value: number;
  observation: string | null;
  status: "PENDING" | "COMPLETED" | "REFUSED";
  transaction_to_account_id: string;
  transaction_from_account_id: string;
  created_at: Date;
  updated_at: Date;
}[];
