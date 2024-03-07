import mongoose, { Document } from "mongoose";

export interface NotificationSchemaType extends Document {
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
  },
  { timestamps: true },
);

const Notification = mongoose.model<NotificationSchemaType>(
  "Notification",
  notificationSchema,
);

export default Notification;
