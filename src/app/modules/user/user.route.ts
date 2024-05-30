import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { userValidateSchema } from "./user.validationSchema";
import auth from "../../middleware/auth";
 
const route = Router()
route.post('/register',validateRequest(userValidateSchema.createUserSchemaValidation),userController.createUserIntoDB)
route.get('/my-profile',auth(),userController.getMyProfileIntoDB)
route.get('/my-profile',auth(),userController.getMyProfileIntoDB)
route.get('/users',auth(),userController.getAllProfileIntoDB)
route.put('/my-profile',auth(),userController.updateUserProfile)
route.put('/updateRole/:id',auth(), userController.updateUserRole)
export const userRoute= route