import { Request, Response } from "express";
import zod from "zod";
import { JwtPayload } from "jsonwebtoken";

import User from "../model/user";
import * as Auth from "../utils/common/auth";
import { CustomRequest } from "../custome";

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
    return res
      .status(200)
      .json({ data: user, message: "User created successfully" });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

async function signin(req: Request, res: Response) {
  try {
    const validatedUserData = userSchema.parse(req.body);
    const user = await User.findOne({ email: validatedUserData.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found for the given email" });
    }

    const passwordMatch = user.isPasswordCorrect(validatedUserData.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const jwt = Auth.createToken({ id: user._id, email: user.email });
    return res
      .status(200)
      .json({ data: jwt, message: "Successfully created new token" });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

async function isAuthenticated(token: string) {
  try {
    const response: JwtPayload = Auth.verifyToken(token);
    const user = await User.findOne({ _id: response.id });
    if (!user) {
      return new Error("No user found");
    }
    return user;
  } catch (error: any) {
    if (error instanceof Error) throw error;
    if (error.name == "JsonWebTokenError") {
      throw new Error("Invalid JWT token");
    }
    if (error.name == "TokenExpiredError") {
      throw new Error("JWT token expired");
    }
    console.log(error);
    throw new Error("Something went wrong");
  }
}

async function updateUserInformation(req: CustomRequest, res: Response) {
  console.log("update: ");
  try {
    const { success } = userSchema.safeParse(req.body);
    if (!success) {
      res.status(411).json({ message: "Error while updating the user" });
    }

    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username,
          email,
        },
      },
      { new: true },
    ).select("-password");

    return res
      .status(200)
      .json({ data: user, message: "Update successfully!" });
  } catch (error: any) {
    console.error(error);
    if (error.statusCode === 404) {
      res.status(404).json("The user requested to update is not present");
    }
    res.status(500).json({ message: "Cannot not update the user information" });
  }
}

export { signup, signin, isAuthenticated, updateUserInformation };
