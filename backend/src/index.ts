import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./db/db";
import userRoutes from "./routes/user-routes";
import infoRoutes from "./routes/info-routes";
import accountRoutes from "./routes/account-routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

app.use("/api/v1", infoRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", accountRoutes);

connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log("Server is up on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Mongodb connection error: ", error);
  });
