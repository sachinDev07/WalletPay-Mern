import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserSchemaType extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  isPasswordCorrect(plainText: string): boolean;
}

const userSchema = new mongoose.Schema({
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
  refreshToke: {
    type: String,
  },
});

userSchema.pre("save", function encrypt(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(
      this.password,
      parseInt(process.env.SALT_ROUNDS as string),
    );
  }
  next();
});

userSchema.methods.isPasswordCorrect = function (plainText: string) {
  return bcrypt.compareSync(plainText, this.password);
};

const User = mongoose.model<UserSchemaType>("User", userSchema);

export default User;
