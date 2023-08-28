import { Express } from "express";
import { readFileSync } from "fs";
import swaggerui from "swagger-ui-express";
import yaml from "yaml";

export const setupSwagger = (app: Express) => {
  const swaggerFile = readFileSync("./swagger.yaml", "utf8");
  const swaggerDocument = yaml.parse(swaggerFile) as swaggerui.JsonObject;

  app.use("/swagger", swaggerui.serve);
  app.get("/swagger", swaggerui.setup(swaggerDocument));
};
