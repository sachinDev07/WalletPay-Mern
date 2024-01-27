import express, { Request, Response } from "express";
import "dotenv/config";

import connectDB from "./db/db";

const app = express();

app.get("/api/v1/info", (req: Request, res: Response) => {
  res.json({ message: "Api is live!" });
});

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
