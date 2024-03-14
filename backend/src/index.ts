import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./db/db";
import userRoutes from "./routes/user-routes";
import infoRoutes from "./routes/info-routes";
import accountRoutes from "./routes/account-routes";
import refreshTokenRoutes from "./routes/refreshToken-routes";
import notificationRoutes from "./routes/notifications-routes";

const app = express();
const server = createServer(app);
const io = new Server();

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

server.on("connection", (socket) => {
  console.log("Someone has connect");
  
  socket.on("Disconnect", () => {
    console.log("Someone has left");
  });
});

connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    server.listen(process.env.PORT, () => {
      console.log("Server is up on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Mongodb connection error: ", error);
  });
