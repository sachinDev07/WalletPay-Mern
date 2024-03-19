import express from "express";

const router = express.Router();

import { checkAuth } from "../middlewares/auth-middlewares";
import * as NotificationController from "../controllers/notification-controller";


router.get("/notifications", checkAuth, NotificationController.getNotifications );

router.delete("/notifications/delete", checkAuth, NotificationController.deleteNotification );

router.post("/notifications/mark-as-read", checkAuth, NotificationController.markNotificationsAsRead );


export default router;