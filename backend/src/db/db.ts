import mongoose from "mongoose";

import ServerConfig from "../config/server-config";

const connectDB = async () => {
  try {
    await mongoose.connect(`${ServerConfig.MONGODB_URI as string}`);
  } catch (error) {
    console.error("Mongodb connection failed", error);
  }
};

export default connectDB;
