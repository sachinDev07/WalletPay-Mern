import express from "express";

import * as UserController from "../controllers/user-controller";

const router = express.Router();

router.post("/users/signup", UserController.signup);

export default router;
