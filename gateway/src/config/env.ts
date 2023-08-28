import "dotenv/config";

export const SERVER = {
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  SERVICES: {
    PRODUCT_URL: process.env.PRODUCT_SERVICE_URL!,
    JOKE_URL: process.env.JOKE_SERVICE_URL!,
  },
};

const ENV = {
  SERVER,
};

export default ENV;
