import mongoose from "mongoose";

import { DB_NAME } from "../constant";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI as string}/${DB_NAME}`);
  } catch (error) {
    console.error("Mongodb connection failed", error);
  }
};

export default connectDB;
