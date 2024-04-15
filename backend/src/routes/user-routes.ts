import express from "express";

import * as UserController from "../controllers/user-controller";
import { checkAuth } from "../middlewares/auth-middlewares";
import { validateSignUpRequest, validateSignInRequest, validateUserUpdateInfoRequest } from "../middlewares/user-auth-middleware";

const router = express.Router();

router.post("/users/signup", validateSignUpRequest, UserController.signup);

router.post("/users/signin", validateSignInRequest, UserController.signin);

router.put("/users/update", validateUserUpdateInfoRequest, UserController.updateUserInformation);

router.get("/users", UserController.getUsers);

router.post("/users/logout", UserController.logOutUser);

export default router;
