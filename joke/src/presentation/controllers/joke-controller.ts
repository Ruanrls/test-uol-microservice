import { GenerateJokeService } from "@/domain/use-cases/generate-joke";
import { Request, Response, Router } from "express";

export class JokeController {
  readonly router: Router;
  constructor(private readonly generateJokeService: GenerateJokeService) {
    this.router = Router();

    this.router.get("/", this.generateJoke);
  }

  generateJoke = async (_: Request, res: Response) => {
    const joke = await this.generateJokeService.execute();
    res.json({ joke });
  };
}
