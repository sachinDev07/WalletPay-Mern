import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", function encrypt(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(
      this.password,
      parseInt(process.env.SALT_ROUNDS as string),
    );
  }
  next();
});


const User = mongoose.model<UserSchemaType>("User", userSchema);

export default User;
