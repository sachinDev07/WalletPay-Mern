import { CookieOptions } from "express";

const DB_NAME: string = "PaymentDB";

const options: CookieOptions = {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 60 * 60 * 1000),
  sameSite: "none",
};

export { 
    DB_NAME,
    options,
 };
