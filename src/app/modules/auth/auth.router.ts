import { Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";

const route= Router()
route.post('/login',authController.loginUser)
route.post('/refreshToken',authController.refreshToken)
route.post('/changePassword',auth(), authController.changePassword)
export const authRoute=route