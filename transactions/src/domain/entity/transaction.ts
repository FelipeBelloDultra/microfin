import { Entity } from "../../core/domain/entity";

interface TransactionProps {
  value: number;
  type: "TRANSFER" | "DEPOSIT";
  status: "PENDING" | "COMPLETED" | "REFUSED";
  accountTo: string;
  accountFrom: string;
}

export class Transaction extends Entity<TransactionProps> {
  public get value() {
    return this.props.value;
  }
  public get type() {
    return this.props.type;
  }
  public get status() {
    return this.props.status;
  }
  public get accountTo() {
    return this.props.accountTo;
  }
  public get accountFrom() {
    return this.props.accountFrom;
  }

  private constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  public complete() {
    this.props.status = "COMPLETED";
  }

  public static create(props: TransactionProps, id?: string) {
    return new Transaction(props, id);
  }
}
