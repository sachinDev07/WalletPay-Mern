import { Response, NextFunction } from "express";
import { CustomRequest } from "../custome.d";

import { isAuthenticated } from "../controllers/user-controller";

async function checkAuth(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization as string;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "JWT Token is missing" });
    }

    const token = authHeader.split(" ")[1];

    const response = await isAuthenticated(token);

    if (response instanceof Error) {
      return res.status(401).json({ error: "Unauthorized!" });
    }
    req.user = response;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error });
  }
}

export { checkAuth };
