import { Response } from "express";
import Notification from "../model/notification";
import { CustomRequest } from "../custome";

async function getNotifications(req: CustomRequest, res: Response) {
  try {
    const id = req.user?._id;

    const notifications = await Notification.aggregate([
      { $match: { receiverId: id, read: false } },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      { $unwind: "$senderDetails" },
      {
        $project: {
          "senderDetails.password": 0,
          "senderDetails.refreshToken": 0,
        },
      },
    ]);

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No messages present" });
    }

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { getNotifications };
