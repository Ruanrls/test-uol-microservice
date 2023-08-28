/* eslint-disable @typescript-eslint/naming-convention */
import "dotenv/config";

export const SERVER = {
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
};

const ENV = {
  SERVER,
};

export default ENV;
