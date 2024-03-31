import { Request, Response } from "express";
import zod from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../model/user";
import * as Auth from "../utils/common/auth";
import { CustomRequest } from "../custome";
import Account from "../model/account";
import ServerConfig from "../config/server-config";

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
    .min(3, { message: "First name must be 3 or more characters long" }),
  lastname: zod.string(),
  oldPassword: zod
    .string()
    .min(5, { message: "Old password must be 5 or more characters long" }),
  newPassword: zod
    .string()
    .min(5, { message: "New password must be 5 or more characters long" }),
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
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      ServerConfig.ACCESS_TOKEN_SECRET as string,
      { expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRY as string },
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      ServerConfig.REFRESH_TOKEN_SECRET as string,
      { expiresIn: ServerConfig.REFRESH_TOKEN_EXPIRY as string },
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const expires = new Date(Date.now() + 60 * 60 * 1000);
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "none",
        domain: "localhost",
      })
      .cookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "none",
        domain: "localhost",
      })
      .json({
        accessToken: accessToken,
        id: user._id,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        message: "User logged In Successfully",
      });
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
    const userId = req.user?._id;
    if (!userId) {
      return res.status(404).json({ message: "User id not found" });
    }

    const validateUserData = userUpdateSchema.parse(req.body);

    const foundUser = await User.findById({ _id: userId });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = foundUser.isPasswordCorrect(
      validateUserData.oldPassword,
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is wrong" });
    }

    const { firstname, lastname, newPassword } = validateUserData;

    const newDecodePassword = bcrypt.hashSync(
      newPassword,
      parseInt(ServerConfig.SALT_ROUNDS as string),
    );

    const user = await User.findByIdAndUpdate(
      foundUser._id,
      {
        $set: {
          firstname,
          lastname,
          password: newDecodePassword,
        },
      },
      { new: true },
    ).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }

    await user.save({ validateBeforeSave: false });

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

    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    return res
      .status(500)
      .json({ message: "Cannot not update the user information" });
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const filter = req.query.filter || "";
    const page: number =
      req.query.page === undefined ? 1 : +req.query.page || 1;
    const limit: number =
      req.query.limit === undefined ? 5 : +req.query?.limit || 5;

    const userIdToExclude = req.query.userIdToExclude;

    let startIndex = 0;
    let endIndex = 5;

    if (filter === "") {
      startIndex = (page - 1) * limit;
      endIndex = page * limit;
    }

    const users = await User.find({
      $and: [
        {
          _id: { $ne: userIdToExclude },
        },
        {
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
        },
      ],
    })
      .sort({ createdAt: "desc" })
      .select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No user found!" });
    }

    const usersData = users.slice(startIndex, endIndex);

    return res.status(200).json({
      totalUsers: users.length,
      data: usersData,
      message: "User found successfully!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong while searching for the user" });
  }
}

async function logOutUser(req: CustomRequest, res: Response) {
  const refreshToken =
    (req.cookies?.refreshToken as string) ||
    (req.header("Authorization")?.replace("Bearer ", "") as string);
  try {
    if (!refreshToken) {
      return res.status(204).json({ message: "No content found!" });
    }

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.sendStatus(204);
    }

    foundUser.refreshToken = "";

    await foundUser.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.json({ message: "Successfully log out " });
  } catch (error) {
    console.error(error);
  }
}

export {
  signup,
  signin,
  isAuthenticated,
  updateUserInformation,
  getUsers,
  logOutUser,
};
