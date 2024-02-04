import express from "express";

import * as AccountController from "../controllers/account-controller";
import { checkAuth } from "../middlewares/auth-middlewares";

const router = express.Router();


router.get("/account/balance", checkAuth, AccountController.getUserBalance);

router.post("/account/transfer", checkAuth, AccountController.handleTransfer);


export default router;
