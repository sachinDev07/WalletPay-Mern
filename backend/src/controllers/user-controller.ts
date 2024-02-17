import { Request, Response } from "express";
import zod, { ZodEffects } from "zod";
import { JwtPayload } from "jsonwebtoken";

import User from "../model/user";
import * as Auth from "../utils/common/auth";
import { CustomRequest } from "../custome";
import Account from "../model/account";

const userSignUpSchema = zod.object({
  firstname: zod
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  lastname: zod
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
});

const userSignInSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
});

const userUpdateSchema = zod.object({
  firstname: zod
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  lastname: zod.string(),
  password: zod
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
});

async function signup(req: Request, res: Response) {
  try {
    const validatedUserData = userSignUpSchema.parse(req.body);
    const existedUser = await User.findOne({ email: validatedUserData.email });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: "User already exists with given email" });
    }

    const user = await User.create(validatedUserData);
    await user.save();

    await Account.create({
      userId: user._id,
      balance: Math.floor(1 + Math.random() * 10000),
    });

    return res
      .status(200)
      .json({ data: user, message: "User created successfully" });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}

async function signin(req: Request, res: Response) {
  try {
    const validatedUserData = userSignInSchema.parse(req.body);
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
      .json({ token: jwt, firstname: user.firstname, lastname: user.lastname, email: user.email, message: "Successfully sign in the user" });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
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
  try {
    const { success } = userUpdateSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ message: "Error while updating the user" });
    }

    const { firstname, lastname, password } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          firstname,
          lastname,
          password,
        },
      },
      { new: true },
    ).select("-password");

    return res
      .status(200)
      .json({ data: user, message: "Updated successfully!" });
  } catch (error: any) {
    console.error(error);
    if (error.statusCode === 404) {
      return res
        .status(404)
        .json("The user requested to update is not present");
    }
    return res
      .status(500)
      .json({ message: "Cannot not update the user information" });
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstname: {
            $regex: filter,
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: filter,
            $options: "i",
          },
        },
      ],
    }).select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No user found!" });
    }

    return res
      .status(200)
      .json({ data: users, message: "User found successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong while searching for the user" });
  }
}

export { signup, signin, isAuthenticated, updateUserInformation, getUsers };
