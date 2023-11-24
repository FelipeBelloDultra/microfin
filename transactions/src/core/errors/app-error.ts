type ErrorsObject = {
  [key: string]: Array<string>;
};

interface AppErrorProps {
  message: string;
  errors?: ErrorsObject;
  statusCode?: number;
}

export class AppError extends Error {
  public readonly errors: ErrorsObject;
  public readonly statusCode: number;

  constructor({ errors = {}, message, statusCode = 400 }: AppErrorProps) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
  }
}
