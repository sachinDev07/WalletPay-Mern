import { Response } from "express";
import mongoose from "mongoose";

import { CustomRequest } from "../custome";
import Account from "../model/account";
import Notification from "../model/notification";

async function getUserBalance(req: CustomRequest, res: Response) {
  try {
    const account = await Account.findOne({ userId: req.user?._id });
    if (!account) {
      return res.status(404).send({ message: "No account found" });
    }

    return res.status(200).json({
      balance: account?.balance,
      message: "Successfully completed the request",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).send({
      message: "Something went wrong while fetching user account balance",
    });
  }
}

async function handleTransfer(req: CustomRequest, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, to }: { amount: number; to: string } = req.body;

    const account = await Account.findOne({ userId: req.user?._id }).session(
      session,
    );

    if (!account) {
      await session.abortTransaction();
      return res.status(400).send({ message: "Invalid account" });
    }
    if (account !== null && account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Invalid account" });
    }

    // perform the transfer
    await Account.updateOne(
      { userId: req.user?._id },
      { $inc: { balance: -amount } },
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
    ).session(session);

    const notification = new Notification({
      senderId: req.user?._id,
      receiverId: to,
      amount,
    });

    await notification.save();

    // commit the transaction
    await session.commitTransaction();
    return res.status(200).json({ message: "Amount transfer successfully" });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong while transffering the amount" });
  }
}

export { getUserBalance, handleTransfer };
