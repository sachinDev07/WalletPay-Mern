import { Request, Response } from "express";
import zod from "zod";

import User from "../model/user";

const userSchema = zod.object({
  username: zod
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
});

async function signup(req: Request, res: Response) {
  try {
    const validatedUserData = userSchema.parse(req.body);
    const existedUser = await User.findOne({ email: validatedUserData.email });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: "User already exists with given email" });
    }

    const user = await User.create(validatedUserData);
    await user.save();
    return res.status(200).json({ user, message: "User created successfully" });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

export { signup };
