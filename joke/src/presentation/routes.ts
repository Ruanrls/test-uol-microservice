import { Express } from "express";
import { makeJokeFactory } from "./factories/joke-factory";

export const registerRoutes = (app: Express) => {
  const jokeController = makeJokeFactory();
  app.use("/joke", jokeController.router);

  app.get("/health", (_, response) =>
    response.status(200).json({ status: "ok" })
  );
};
