import ENV from "@/config/env";
import jsonwebtoken from "jsonwebtoken";

const JWT_EXPIRATION_IN_SECONDS = 24 * 60 * 60 * 1000;

export class JwtProvider {
  sign = (payload: string | Buffer) =>
    jsonwebtoken.sign(payload, ENV.SERVER.JWT_SECRET);

  verify = (token: string) =>
    jsonwebtoken.verify(token, ENV.SERVER.JWT_SECRET, {
      maxAge: new Date().getTime() + JWT_EXPIRATION_IN_SECONDS,
    });
}
