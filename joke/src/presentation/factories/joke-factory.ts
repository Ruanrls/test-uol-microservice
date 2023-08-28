import { GenerateJokeService } from "@/domain/use-cases/generate-joke";
import { ChukNorrisProvider } from "@/infra/providers/chuknorris-provider";
import { JokeController } from "@/presentation/controllers/joke-controller";

export function makeJokeFactory() {
  const chukNorrisProvider = new ChukNorrisProvider();
  const generateJokeService = new GenerateJokeService(chukNorrisProvider);
  return new JokeController(generateJokeService);
}
