import { Request, Response } from "express";
import User from "../model/user";
import jwt from "jsonwebtoken";

import { JwtPayload } from "../utils/common/auth";
import ServerConfig from "../config/server-config";

async function handleRefreshToken(req: Request, res: Response) {
  try {
    const incomingRefreshToken = req.cookies.refreshToken as string;

    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorized acesss!" });
    }

    const foundUser = await User.findOne({
      refreshToken: incomingRefreshToken,
    });

    if (!foundUser) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      ServerConfig.REFRESH_TOKEN_SECRET as string,
    ) as JwtPayload;
    if (!decodedToken) {
      return res
        .status(403)
        .json({ message: "Forbidden: Refuse to authorize" });
    }

    const accessToken = jwt.sign(
      { id: decodedToken.id, email: decodedToken.email },
     ServerConfig.ACCESS_TOKEN_SECRET as string,
      { expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRY },
    );

    return res.json({
      role: foundUser.role, 
      accessToken: accessToken 
    });
  } catch (error) {
    console.error(error);
  }
}

export { handleRefreshToken };
