import { Entity } from "../../core/domain/entity";
import { InvalidAmount } from "./errors/invalid-amount";

interface AccountProps {
  externalAccountId: string;
  email: string;
  amount: number;
}

export class TransactionAccount extends Entity<AccountProps> {
  public get externalAccountId() {
    return this.props.externalAccountId;
  }
  public get email() {
    return this.props.email;
  }
  public get amount() {
    return this.props.amount;
  }

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  public updateAmountValue(newAmount: number) {
    if (newAmount < 0) {
      throw new InvalidAmount("Amount must be greater than zero.");
    }

    this.props.amount = newAmount;
  }

  public static create(props: AccountProps, id?: string) {
    return new TransactionAccount(
      {
        email: props.email,
        externalAccountId: props.externalAccountId,
        amount: props.amount,
      },
      id
    );
  }
}
