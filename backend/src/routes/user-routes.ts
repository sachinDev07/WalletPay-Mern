import express from "express";

import * as UserController from "../controllers/user-controller";

const router = express.Router();

router.post("/users/signup", UserController.signup);

router.post("/users/signin", UserController.signin);

export default router;
