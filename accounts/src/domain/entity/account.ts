import { hash, compare } from "bcryptjs";
import { Entity } from "../../core/domain/entity";
import { InvalidAmount } from "./errors/invalid-amount";
import { InvalidAccount } from "./errors/invalid-account";

interface AccountProps {
  name: string;
  email: string;
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
  public get password() {
    return this.props.password;
  }

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  private static isValid(props: AccountProps) {
    if (!props.email || props.email.length > 255 || props.email.length < 6)
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

  public async comparePasswordHash(plainPassword: string): Promise<boolean> {
    const passwordIsEqual = await compare(plainPassword, this.props.password);

    return passwordIsEqual;
  }

  private static async encodePassword(password: string): Promise<string> {
    const hashed = await hash(password, 8);

    return hashed;
  }

  public updateAmountValue(newAmount: number) {
    if (newAmount < 0) {
      throw new InvalidAmount("Amount must be greater than zero.");
    }

    this.props.amount = newAmount;
  }

  public static async create(props: AccountProps, id?: string) {
    const accountIsValid = this.isValid(props);

    if (!accountIsValid) throw new InvalidAccount();

    return new Account(
      {
        email: props.email,
        name: props.name,
        password: id
          ? props.password
          : await this.encodePassword(props.password),
        amount: props.amount,
      },
      id
    );
  }
}
