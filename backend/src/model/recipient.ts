import mongoose from "mongoose";

export interface recepientSchemaType {
  _id: string;
  name: string;
  userId: string;
}

const recepientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Recepient = mongoose.model<recepientSchemaType>("Recepient", recepientSchema);

export default Recepient;
