import express from "express";

import * as InfoController from "../controllers/info-controller";

const router = express.Router();

router.get("/info", InfoController.info);

export default router;
