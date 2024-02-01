import { Response } from "express";

const info = (_: any, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Api is live",
    errors: {},
    data: {},
  });
};

export { info };
