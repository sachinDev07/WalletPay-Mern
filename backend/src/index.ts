import express, { Request, Response } from "express";

const app = express();

app.get("/api/v1/info", (req: Request, res: Response) => {
  res.json({ message: "Api is live!" });
});

app.listen(5001, () => {
  console.log("Server is up!");
});
