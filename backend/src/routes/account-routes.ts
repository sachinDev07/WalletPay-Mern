import express from "express";

import * as AccountController from "../controllers/account-controller";
import { checkAuth } from "../middlewares/auth-middlewares";
import { validateTransferRequest } from "../middlewares/account-middleware";

const router = express.Router();


router.get("/account/balance", AccountController.getUserBalance);

router.post("/account/transfer", validateTransferRequest, AccountController.handleTransfer);


export default router;
