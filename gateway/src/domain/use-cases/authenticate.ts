import { JwtProvider } from "@/infra/providers/jwt";
import { Result } from "../entities";
import { UserNotFoundError } from "../errors/user-not-found";

export namespace AuthenticateService {
  export type Params = {
    username: string;
    password: string;
  };
}

export class AuthenticateService {
  constructor(private readonly jwtProvider: JwtProvider) {}

  execute = (params: AuthenticateService.Params) => {
    const { username, password } = params;

    if (username !== "admin" || password !== "admin") {
      return Result.fail<UserNotFoundError>(new UserNotFoundError());
    }

    const jwtContent = {
      username,
    };
    const token = this.jwtProvider.sign(JSON.stringify(jwtContent));

    return Result.ok(token);
  };
}
