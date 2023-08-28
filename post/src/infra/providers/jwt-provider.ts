import ENV from "@/config/env";
import jsonwebtoken from "jsonwebtoken";

export class JwtProvider {
  verify(token: string): jsonwebtoken.JwtPayload {
    const payload = jsonwebtoken.verify(token, ENV.SERVER.JWT_SECRET);
    return payload as jsonwebtoken.JwtPayload;
  }
}
