import mongoose from "mongoose";

export type UserSchemaType = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserSchemaType>("User", userSchema);

export default User;
