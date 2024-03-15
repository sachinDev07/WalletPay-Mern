import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";

import ServerConfig from "./config/server-config";
import connectDB from "./db/db";
import userRoutes from "./routes/user-routes";
import infoRoutes from "./routes/info-routes";
import accountRoutes from "./routes/account-routes";
import refreshTokenRoutes from "./routes/refreshToken-routes";
import notificationRoutes from "./routes/notifications-routes";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A new user has connected ", socket.id);
});

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
    server.listen(ServerConfig.PORT, () => {
      console.log("Server is up on port: ", ServerConfig.PORT);
    });
  })
  .catch((error) => {
    console.error("Mongodb connection error: ", error);
  });
