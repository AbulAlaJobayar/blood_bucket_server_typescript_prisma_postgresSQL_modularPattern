import httpStatus from "http-status";
import { userService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";


const createUserIntoDB = catchAsync(async (req:Request, res:Response) => {
  const result = await userService.createUserIntoDB(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const getMyProfileIntoDB = catchAsync(async (req:Request & {user?:any}, res:Response) => {
  const result = await userService.getMyProfileIntoDB(req.user);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});
const updateUserProfile = catchAsync(async (req:Request & {user?:any}, res:Response) => {
  const result = await userService.updateUserProfile(req.body,req.user);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});



export const userController={
        createUserIntoDB,
        getMyProfileIntoDB,
        updateUserProfile
}
