import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import ServerConfig from "./config/server-config";
import userRoutes from "./routes/user-routes";
import infoRoutes from "./routes/info-routes";
import accountRoutes from "./routes/account-routes";
import refreshTokenRoutes from "./routes/refreshToken-routes";
import notificationRoutes from "./routes/notifications-routes";
import path from "path";
import serverConfig from "./config/server-config";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ServerConfig.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/v1", infoRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", refreshTokenRoutes);
app.use("/api/v1", notificationRoutes);

mongoose
  .connect(serverConfig.MONGODB_URI as string)
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(+ServerConfig.PORT || 7000, () => {
      console.log("Server is up on port: ", ServerConfig.PORT);
    });
  })
  .catch((error) => {
    console.error("Mongodb connection error: ", error);
  });
