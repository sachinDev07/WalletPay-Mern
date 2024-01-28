import { Request, Response } from "express";

import User from "../model/user";

async function signup(req: Request, res: Response) {
  try {
    const existedUser = await User.findOne({ email: req.body.email });
    if (existedUser) {
     return res.status(400).json({ message: "User already exists with given email" });
    }

    const user = await User.create(req.body);
    await user.save();
    return res.status(200).json({ user, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

export { signup };
