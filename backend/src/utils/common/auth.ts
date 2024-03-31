import jwt from "jsonwebtoken";
import ServerConfig from "../../config/server-config"

export interface JwtPayload {
  id: string;
  email: string;
}

interface UserType {
  _id: string;
  email: string;
}

function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, ServerConfig.ACCESS_TOKEN_SECRET as string) as JwtPayload
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function generateAccessTokenAndRefreshToken(user: UserType) {
  try {
      const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        ServerConfig.ACCESS_TOKEN_SECRET as string,
        { expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRY as string },
      );
      const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        ServerConfig.REFRESH_TOKEN_SECRET as string,
        { expiresIn: ServerConfig.REFRESH_TOKEN_EXPIRY as string },
      );

      return { accessToken, refreshToken};
  } catch (error) {
      console.error("ERROR: ", error);
      throw error;
  }
}

export {
  verifyToken,
  generateAccessTokenAndRefreshToken,
}