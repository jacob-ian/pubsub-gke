type ErrorCode =
  | "bad_request"
  | "unauthenticated"
  | "unauthorized"
  | "not_found"
  | "internal"
  | "unknown";

interface ErrorResponse {
  error: ErrorCode;
  message: string;
  context?: any;
}

type StatusCodes = { [status in ErrorCode]: number };

const STATUS_CODES: StatusCodes = {
  bad_request: 400,
  unauthenticated: 401,
  unauthorized: 403,
  not_found: 404,
  internal: 500,
  unknown: 400,
};

export class ApiError {
  private status: number;
  private error: ErrorCode;
  private message: string;
  private context: any | undefined;

  constructor(error: ErrorCode, message: string, context?: any) {
    this.status = STATUS_CODES[error];
    this.error = error;
    this.message = message;
    this.context = context;
  }

  public getHttpStatus(): number {
    return this.status;
  }

  public getResponse(withContext?: boolean): ErrorResponse {
    let error: ErrorResponse = {
      error: this.error,
      message: this.message,
    };
    if (withContext && !!this.context) {
      error = { ...error, context: this.context };
    }
    return error;
  }
}
