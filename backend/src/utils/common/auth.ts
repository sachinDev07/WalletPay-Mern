import jwt from "jsonwebtoken";
import ServerConfig from "../../config/server-config";

export interface JwtPayload {
  id: string;
  email: string;
}

interface UserType {
  _id: string;
  email: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(
      token,
      ServerConfig.SECRET_TOKEN as string,
    ) as JwtPayload;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function generateAccessTokenAndRefreshToken(
  user: UserType,
): Promise<TokenPair> {
  return new Promise((resolve, reject) => {
    try {
      if (!ServerConfig.ACCESS_TOKEN_SECRET || !ServerConfig.ACCESS_TOKEN_EXPIRY) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined in ServerConfig");
      }

      if (!ServerConfig.REFRESH_TOKEN_SECRET || !ServerConfig.REFRESH_TOKEN_EXPIRY) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined in ServerConfig");
      }

      const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        ServerConfig.ACCESS_TOKEN_SECRET,
        { expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRY },
      );
      const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        ServerConfig.REFRESH_TOKEN_SECRET,
        { expiresIn: ServerConfig.REFRESH_TOKEN_EXPIRY },
      );

      resolve({ accessToken, refreshToken });
    } catch (error) {
      console.error("Error generating tokens:", error);
      reject(error);
    }
  });
}

export { verifyToken, generateAccessTokenAndRefreshToken };
