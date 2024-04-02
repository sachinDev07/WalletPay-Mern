import express from "express";

import * as UserController from "../controllers/user-controller";
import { checkAuth } from "../middlewares/auth-middlewares";
import { validateSignUpRequest } from "../middlewares/user-auth-middleware";

const router = express.Router();

router.post("/users/signup", validateSignUpRequest, UserController.signup);

router.post("/users/signin", UserController.signin);

router.put("/users/update", checkAuth, UserController.updateUserInformation);

router.get("/users", checkAuth, UserController.getUsers);

router.post("/users/logout", checkAuth, UserController.logOutUser);

export default router;
