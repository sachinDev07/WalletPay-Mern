import express from "express";

import * as UserController from "../controllers/user-controller";
import { checkAuth } from "../middlewares/auth-middlewares";

const router = express.Router();

router.post("/users/signup", UserController.signup);

router.post("/users/signin", UserController.signin);

router.put("/users/update", checkAuth, UserController.updateUserInformation);

router.get("/users", checkAuth, UserController.getUsers);

router.post("/users/logout", checkAuth, UserController.logOutUser);

router.post("/users/refreshToken", UserController.generateRefreshToken);

export default router;
