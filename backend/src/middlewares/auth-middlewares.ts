import { Response, NextFunction } from "express";
import { CustomRequest } from "../custome.d";

import { isAuthenticated } from "../controllers/user-controller";

interface ResponseType {
  username: string;
  email: string;
  password: string;
}

function isUser(value: ResponseType | void): value is ResponseType {
  return !!value;
}

async function checkAuth(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers["x-access-token"] as string;
    
    if (!token) {
      return res.status(401).json({ error: "JWT Token is missing" });
    }

    const response = await isAuthenticated(token);

    if (response instanceof Error) {
      return res.status(401).json({ error: "Unauthorized!" });
    }
    req.user = response;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({error: error});
  }
}

export { checkAuth };
