import { Router } from "express";
import { userController } from "./user.controller";

const route = Router()
route.post('/register',userController.createUserIntoDB)
route.get('/donor-list',userController.getAllDonorFromDB)

export const userRoute= route