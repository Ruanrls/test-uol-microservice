export class UserNotFoundError extends Error {
  code: string;

  constructor() {
    super("User not found");
    this.code = "USER_NOT_FOUND";
  }
}
