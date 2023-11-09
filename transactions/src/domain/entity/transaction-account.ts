import { Entity } from "../../core/domain/entity";

interface AccountProps {
  externalAccountId: string;
  email: string;
  code?: string;
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
  public get code() {
    return this.props.code;
  }

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  public static create(props: AccountProps, id?: string) {
    return new TransactionAccount(
      {
        email: props.email,
        externalAccountId: props.externalAccountId,
        amount: props.amount,
        code: props.code,
      },
      id
    );
  }
}
