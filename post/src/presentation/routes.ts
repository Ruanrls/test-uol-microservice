import { Express } from "express";
import { makeProductController } from "./factories/product-factory";

export const registerRoutes = (app: Express) => {
  const productController = makeProductController();
  app.use("/product", productController.router);

  app.get("/health", (_, response) =>
    response.status(200).json({ status: "ok" })
  );
};
