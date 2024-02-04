import express from "express";

import * as AccountController from "../controllers/account-controller";
import { checkAuth } from "../middlewares/auth-middlewares";
import { validateTransferRequest } from "../middlewares/account-middleware";

const router = express.Router();


router.get("/account/balance", checkAuth, AccountController.getUserBalance);

router.post("/account/transfer", checkAuth, validateTransferRequest, AccountController.handleTransfer);


export default router;
