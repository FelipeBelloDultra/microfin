import { Entity } from "../../core/domain/entity";

interface AccountProps {
  name: string;
  email: string;
  code?: string;
  password: string;
  amount: number;
}

export class Account extends Entity<AccountProps> {
  public get name() {
    return this.props.name;
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
  public get password() {
    return this.props.password;
  }

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  private static isValid(props: AccountProps) {
    if (!props.email || props.email.length > 255 || props.email.length < 6)
      return false;
    if (props.code && (props.code.length > 255 || props.code.length < 6))
      return false;
    if (!props.name || props.name.length > 255 || props.name.length < 6)
      return false;
    if (
      !props.password ||
      props.password.length > 255 ||
      props.password.length < 6
    )
      return false;
    if (props.amount && props.amount < 0) return false;

    return true;
  }

  public updateAmountValue(newAmount: number) {
    if (newAmount < 0) throw new Error("amount must be greater than zero");

    this.props.amount = newAmount;
  }

  public static create(props: AccountProps, id?: string) {
    const accountIsValid = this.isValid(props);

    if (!accountIsValid) throw new Error("Invalid account");

    return new Account(
      {
        email: props.email,
        name: props.name,
        password: props.password,
        amount: props.amount,
        code: props.code,
      },
      id
    );
  }
}
