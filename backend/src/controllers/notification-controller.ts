import { Request, Response } from "express";
import Notification from "../model/notification";
import { CustomRequest } from "../custome";

async function getNotifications(req: CustomRequest, res: Response) {
  try {
    const id = req.user?._id;

    const notifications = await Notification.aggregate([
      { $match: { receiverId: id } },
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
    ]).sort({ createdAt: "desc" });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No messages present" });
    }

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteNotification(req: Request, res: Response) {
  try {
    const id = req.body?.id;
    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const response = await Notification.deleteOne({ _id: id });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function markNotificationsAsRead(req: Request, res: Response) {
  try {
    const { notificationIds } = req.body;

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const updatedResult = await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { read: true }
    );

    return res.status(200).json({ success: true, data: updatedResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { getNotifications, deleteNotification, markNotificationsAsRead };
