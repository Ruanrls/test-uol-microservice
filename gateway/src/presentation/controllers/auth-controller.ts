import { AuthenticateService } from "@/domain/use-cases/authenticate";
import { Request, Response, Router } from "express";

export class AuthController {
  readonly router: Router;
  constructor(private readonly authenticateService: AuthenticateService) {
    this.router = Router();

    this.router.post("/", this.authenticate);
  }

  authenticate = async (req: Request, res: Response) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    const result = this.authenticateService.execute({
      username,
      password,
    });

    if (result.isFailure()) {
      return res.status(401).send("Unauthorized");
    }

    res.send({ status: "ok", data: result.data });
  };
}
