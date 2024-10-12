/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack?: string) {
    super(message);
    this.statusCode = statusCode;

    stack
      ? (this.stack = stack)
      : Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
