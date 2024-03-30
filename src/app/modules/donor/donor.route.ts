import { Router } from "express"
import { donorController } from "./donor.controller"
import { validateRequest } from "../../middleware/validateRequest"
import { donarValidationSchema } from "./donor.validation.schema"
import auth from "../../middleware/auth"



const route=Router()
route.get('/donor-list',donorController.getAllDonorFromDB)
route.post('/donation-request',auth(),validateRequest(donarValidationSchema.requestDonorForBlood), donorController.requestDonorForBlood)
route.get('/donation-request',auth(), donorController.getMyDonationRequest)
route.put('/donation-request/:requestId',auth(), donorController.updateRequesterRequest)

export const donorRouter=route