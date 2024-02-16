import { Response } from "express";
import mongoose from "mongoose";

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
      res.status(400).send({ message: "Invalid account" });
    }
    if (account !== null && account.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      res.status(404).json({ message: "Invalid account" });
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

    // commit the transaction
    await session.commitTransaction();
    res.status(200).json({ message: "Amount transfer successfully" });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while transffering the amount" });
  }
}

export { getUserBalance, handleTransfer };
