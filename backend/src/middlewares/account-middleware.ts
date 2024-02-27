import { Request, Response, NextFunction } from "express";
import zod from "zod";

const transferSchema = zod.object({
  amount: zod
    .number()
    .nonnegative({ message: "Amount can't be in negative" })
    .gt(0, { message: "Amount must be greater than zero" })
    .min(1, { message: "Amount must be provided!" }),
  to: zod.string(),
});

async function validateTransferRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    req.body.amount = parseFloat(req.body.amount);
    transferSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    console.error(error);
    res.status(400).json({ error: "Invalid transfer data" });
  }
}

export { validateTransferRequest };
