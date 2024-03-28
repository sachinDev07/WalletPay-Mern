import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import ServerConfig from "./src/config/server-config";
import connectDB from "./src/db/db";
import userRoutes from "./src/routes/user-routes";
import infoRoutes from "./src/routes/info-routes";
import accountRoutes from "./src/routes/account-routes";
import refreshTokenRoutes from "./src/routes/refreshToken-routes";
import notificationRoutes from "./src/routes/notifications-routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/v1", infoRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", refreshTokenRoutes);
app.use("/api/v1", notificationRoutes);

connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(ServerConfig.PORT, () => {
      console.log("Server is up on port: ", ServerConfig.PORT);
    });
  })
  .catch((error) => {
    console.error("Mongodb connection error: ", error);
  });