import jwt from "jsonwebtoken";
import ServerConfig from "../../config/server-config"

export interface JwtPayload {
  id: string;
  email: string;
}

function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, ServerConfig.REFRESH_TOKEN_SECRET as string) as JwtPayload
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  verifyToken,
}