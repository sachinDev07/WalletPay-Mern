import express from "express";

const router = express.Router();

import { checkAuth } from "../middlewares/auth-middlewares";
import * as NotificationController from "../controllers/notification-controller";


router.get("/notifications", NotificationController.getNotifications );

router.delete("/notifications/delete", NotificationController.deleteNotification );

router.post("/notifications/mark-as-read", NotificationController.markNotificationsAsRead );


export default router;