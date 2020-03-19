import dotenv from "dotenv";
import utils from "./utils";

if (process.env.NODE_ENV !== "production") {
  // Loading env variables from `.env` file
  dotenv.config();
}

let config = {
  port: 5000,
  jwtKey: utils.getEnvOrPanic("APP_JWT_KEY"),
  mongo: {
    srvUri: utils.getEnvOrPanic("APP_MONGO_SRV_URI")
  },
  params: {
    perPage: utils.getEnvOrDefault("APP_PARAMS_PER_PAGE", "20")
  }
};

export default config;
