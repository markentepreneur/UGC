export interface IAppError extends Error {
  statusCode: number;
  status: string;
  isOptional: boolean;
  message: string;
}

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOptional: boolean;
  message!: string;
  errors: { [key in string]: string } | object;

  constructor(
    message: string,
    statusCode?: number,
    errors?: { [key in string]: string }
  ) {
    super();

    this.statusCode = statusCode || 500;
    this.errors = errors || {};
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOptional = true;

    // add stack to error
    Error.captureStackTrace(this, this.constructor);
  }
}
