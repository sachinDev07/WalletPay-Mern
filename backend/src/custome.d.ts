import { Request } from "express";
import { UserSchemaType } from "./model/user";

interface CustomRequest extends Request {
  user?: UserSchemaType;
}

export { CustomRequest };
