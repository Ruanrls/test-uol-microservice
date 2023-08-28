export class Result<Error, Success> {
  static fail<Error>(error: Error): Result<Error, undefined> {
    return new Result<Error, undefined>(error, undefined);
  }

  static ok<Success>(data: Success): Result<undefined, Success> {
    return new Result<undefined, Success>(undefined, data);
  }

  constructor(
    private readonly _error: Error,
    private readonly _data: Success
  ) {
    Object.freeze(this);
  }

  get error(): Error {
    return this._error;
  }

  get data(): Success {
    return this._data;
  }

  isSuccess = (): this is Result<undefined, Success> =>
    this._error === undefined;

  isFailure = (): this is Result<Error, undefined> => this._error !== undefined;
}

export type Either<Error, Success> =
  | Result<Error, undefined>
  | NonNullable<Result<undefined, Success>>;
