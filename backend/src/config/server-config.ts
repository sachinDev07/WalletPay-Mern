import dotenv from "dotenv";

dotenv.config();

interface ServerConfig {
  PORT: string;
  MONGODB_URI: string;
  SALT_ROUNDS: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRY: string;
  FRONTEND_URL: string;
}

const serverConfig: ServerConfig = {
  PORT: process.env.PORT || "",
  MONGODB_URI: process.env.MONGODB_URI || "",
  SALT_ROUNDS: process.env.SALT_ROUNDS || "",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "",
};

export default serverConfig;
