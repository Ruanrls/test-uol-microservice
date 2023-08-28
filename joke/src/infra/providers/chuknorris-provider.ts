import { JOKE } from "@/config/env";
import axios, { Axios } from "axios";

type Joke = {
  id: string;
  value: string;
};

export class ChukNorrisProvider {
  private readonly chucknorrisApi: Axios;

  constructor() {
    this.chucknorrisApi = axios.create({
      baseURL: JOKE.URL,
    });
  }

  async getRandomJoke() {
    const { data } = await this.chucknorrisApi.get<Joke>("/random");
    return data.value;
  }
}
