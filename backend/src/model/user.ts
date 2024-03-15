import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import ServerConfig from "../config/server-config";

export interface UserSchemaType extends Document {
  _id: string;
  role: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  isPasswordCorrect(plainText: string): boolean;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.USER,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function encrypt(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(
      this.password,
      parseInt(ServerConfig.SALT_ROUNDS as string),
    );
  }
  next();
});

userSchema.methods.isPasswordCorrect = function (plainText: string) {
  return bcrypt.compareSync(plainText, this.password);
};

const User = mongoose.model<UserSchemaType>("User", userSchema);

export default User;
