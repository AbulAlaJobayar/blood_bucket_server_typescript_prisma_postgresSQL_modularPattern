import httpStatus from "http-status";
import { userService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";

const createUserIntoDB = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const getAllDonorFromDB= catchAsync(async (req, res) => {
 
 const filters=pick(req.query,['availability','bloodType','searchTerm'])
 const options=pick(req.query,['limit','page','sortBy','sortOrder']) 
 const result = await userService.getAllDonorFromDB(filters,options);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Donors successfully found",
    meta:result.meta,
    data: result.data,
  });
});


export const userController={
        createUserIntoDB,
        getAllDonorFromDB    
}
