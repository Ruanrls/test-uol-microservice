import { ChukNorrisProvider } from "@/infra/providers/chuknorris-provider";

export class GenerateJokeService {
  constructor(private readonly chuckNorrisProvider: ChukNorrisProvider) {}

  async execute() {
    const joke = await this.chuckNorrisProvider.getRandomJoke();
    return joke;
  }
}
