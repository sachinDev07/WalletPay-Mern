import mongoose from "mongoose";

export interface AccountTypeSchema {
  _id: string;
  userId: string;
  balance: number;
}

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Account = mongoose.model<AccountTypeSchema>("Account", accountSchema);

export default Account;
