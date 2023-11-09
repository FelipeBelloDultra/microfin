import { Entity } from "../../core/domain/entity";

interface TransactionProps {
  value: number;
  status: "PENDING" | "COMPLETED" | "REFUSED";
  accountTo: string;
  accountFrom: string;
  observation?: string;
}

export class Transaction extends Entity<TransactionProps> {
  public get value() {
    return this.props.value;
  }
  public get observation() {
    return this.props.observation;
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

  public refuse() {
    this.props.status = "REFUSED";
  }

  public changeObservation(text: string) {
    this.props.observation = text;
  }

  public static create(props: TransactionProps, id?: string) {
    return new Transaction(props, id);
  }
}
