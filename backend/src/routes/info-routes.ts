import express from "express";

import * as InfoController from "../controllers/info-controller";
import { checkAuth } from "../middlewares/auth-middlewares";

const router = express.Router();

router.get("/info", checkAuth
, InfoController.info);

export default router;
