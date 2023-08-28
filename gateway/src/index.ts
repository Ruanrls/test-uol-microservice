import express, { NextFunction, Request, Response } from "express";
import httpProxy from "express-http-proxy";
import helmet from "helmet";
import ENV from "./config/env";
import { setupSwagger } from "./config/swagger-setup";
import { makeAuthController } from "./presentation/factories/auth-factory";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());

setupSwagger(app);

app.use("/auth", makeAuthController().router);

app.get("/health", async (_, res) => {
  const productServiceStatusPromise = fetch(
    `${ENV.SERVER.SERVICES.PRODUCT_URL}/health`
  );
  const jokeServiceStatusPromise = fetch(
    `${ENV.SERVER.SERVICES.JOKE_URL}/health`
  );

  const [productServiceStatus, jokeServiceStatus] = await Promise.allSettled([
    productServiceStatusPromise,
    jokeServiceStatusPromise,
  ]);

  const productIsUp = productServiceStatus.status === "fulfilled";
  const jokeIsUp = jokeServiceStatus.status === "fulfilled";
  if (productIsUp && jokeIsUp)
    return res
      .status(200)
      .send({ status: "ok", message: "All services are up" });

  return res.status(200).send({
    status: "warning",
    message: `Some services are not stable - ProductService=${productServiceStatus.status} / JokeService=${jokeServiceStatus.status}`,
  });
});

const productProxy = httpProxy(ENV.SERVER.SERVICES.PRODUCT_URL);
const jokeProxy = httpProxy(ENV.SERVER.SERVICES.JOKE_URL);
app.all("/product*", productProxy);
app.all("/joke*", jokeProxy);

app.use((err: unknown, _: Request, res: Response, __: NextFunction) => {
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.listen(ENV.SERVER.PORT, () => {
  console.log(`--- Gateway running on ${ENV.SERVER.PORT} ---`);
});
