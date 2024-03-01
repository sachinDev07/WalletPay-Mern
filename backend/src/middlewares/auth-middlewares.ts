import { Response, NextFunction } from "express";
import { CustomRequest } from "../custome.d";

import { isAuthenticated } from "../controllers/user-controller";

async function checkAuth(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    console.log("refresh: ", refreshToken);

    if (!refreshToken) {
      return res.status(401).json({ error: "JWT Token is missing" });
    }

    const response = await isAuthenticated(refreshToken);

    console.log("res: ", response);

    if (response instanceof Error) {
      return res.status(401).json({ error: "Unauthorized!" });
    }
    req.user = response;
    next();
  } catch (error) {
    console.error( error);
    res.status(401).json({ error: error });
  }
}

export { checkAuth };
