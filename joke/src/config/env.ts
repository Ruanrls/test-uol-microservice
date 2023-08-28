/* eslint-disable @typescript-eslint/naming-convention */
import "dotenv/config";

export const SERVER = {
  PORT: process.env.PORT!,
};

export const JOKE = {
  URL: process.env.JOKE_API_PROVIDER!,
};

const ENV = {
  SERVER,
};

export default ENV;
