import express, { Request, Response } from "express";
import "dotenv/config";

import connectDB from "./db/db";
import userRoutes from "./routes/user-routes";
import infoRoutes from "./routes/info-routes";
import accountRoutes from "./routes/account-routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", infoRoutes)
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
