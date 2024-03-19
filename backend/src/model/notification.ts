import mongoose, { Document } from "mongoose";

export enum READ_STATUS {
    TRUE = "true",
    FALSE = "false",
}

export interface NotificationSchemaType extends Document {
  _id: string;
  senderId: string;
  receiverId: string;
  amount: number;
}

const notificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      enum: READ_STATUS,
      default: READ_STATUS.FALSE,
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model<NotificationSchemaType>(
  "Notification",
  notificationSchema,
);

export default Notification;
