import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import ENV from "./config/env";
import { registerRoutes } from "./presentation/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());

registerRoutes(app);

app.use((err: unknown, _: Request, res: Response, __: NextFunction) => {
  console.log(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(ENV.SERVER.PORT, () => {
  console.log("🚀 ~ Joke service running on ", ENV.SERVER.PORT);
});
