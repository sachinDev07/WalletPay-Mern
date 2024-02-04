import { Request, Response } from "express";

import { CustomRequest } from "../custome";
import Account from "../model/account";


async function getUserBalance(req: CustomRequest, res: Response) {
  try {
    const account = await Account.findOne({ userId: req.user?._id });
    if (!account) {
      res.status(404).send({ error: "No account found" });
    }

    res.status(200).json({
      balance: account?.balance,
      message: "Successfully completed the request",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({
      message: "Something went wrong while fetching user account balance",
    });
  }
}

export { getUserBalance };
