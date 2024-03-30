import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { userValidateSchema } from "./user.validationSchema";
import auth from "../../middleware/auth";
 
const route = Router()
route.post('/register',validateRequest(userValidateSchema.createUserSchemaValidation),userController.createUserIntoDB)
route.get('/my-profile',auth(),userController.getMyProfileIntoDB)
route.put('/my-profile',auth(),userController.updateUserProfile)

export const userRoute= route