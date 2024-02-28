import express from "express";
import { handleRefreshToken } from "../controllers/refreshToken-controller";


const router = express.Router();

router.post("/refresh-token", handleRefreshToken );

export default router;