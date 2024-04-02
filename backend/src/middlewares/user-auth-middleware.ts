import { NextFunction, Request, Response } from "express";
import zod from "zod";

const userSignUpSchema = zod.object({
  firstname: zod
    .string()
    .min(3, { message: "firstname must be 3 or more characters long" }),
  lastname: zod
    .string()
    .min(3, { message: "lastname must be 3 or more characters long" }),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(5, { message: "password must be 5 or more characters long" }),
});

const userUpdateSchema = zod.object({
  firstname: zod
    .string()
    .min(3, { message: "First name must be 3 or more characters long" }),
  lastname: zod.string(),
  oldPassword: zod
    .string()
    .min(5, { message: "Old password must be 5 or more characters long" }),
  newPassword: zod
    .string()
    .min(5, { message: "New password must be 5 or more characters long" }),
});

const userSignInSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(5, { message: "Password must be 5 or more characters long" }),
});

function validateSignUpRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    userSignUpSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof zod.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
    }
  }
}

function validateSignInRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    userSignInSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof zod.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
    }
  }
}

function validateUserUpdateInfoRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    userUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof zod.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
    }
  }
}

export { 
  validateSignUpRequest,
  validateSignInRequest,
  validateUserUpdateInfoRequest,
 };
