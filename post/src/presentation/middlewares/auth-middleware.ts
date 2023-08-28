import { JwtProvider } from "@/infra/providers/jwt-provider";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  constructor(private readonly jwtProvider: JwtProvider) {}

  handle = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing authorization header" });
    }

    const [, token] = authHeader.split(" ");
    try {
      const payload = this.jwtProvider.verify(token);

      Object.assign(req, { user: payload.username as string });
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
