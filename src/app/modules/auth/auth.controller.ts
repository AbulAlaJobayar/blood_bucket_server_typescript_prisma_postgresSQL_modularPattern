import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authService } from "./auth.service";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req:Request, res:Response) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken, ...others } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: others,
  });
});
const refreshToken = catchAsync(async (req:Request, res:Response) => {
  const {refreshToken}=req.cookies
 
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "accessToken retrieve successfully",
    data: result,
  });
});
const changePassword = catchAsync(async (req:Request &{user?:any}, res:Response) => {
  const result = await authService.changedPassword(req.user,req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "password Changed successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword
};
