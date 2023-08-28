import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import ENV from "./config/env";
import { registerRoutes } from "./presentation/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());

registerRoutes(app);

app.use((error: unknown, _: Request, res: Response, __: NextFunction) => {
  console.log("🚀 ~ file: index.ts:14 ~ app.use ~ error:", error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(ENV.SERVER.PORT, () => {
  console.log("🚀 ~ Product service runnin on ", ENV.SERVER.PORT);
});
