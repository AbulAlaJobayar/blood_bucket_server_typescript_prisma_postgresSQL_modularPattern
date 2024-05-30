import httpStatus from "http-status";
import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { donorService } from "./donor.service";
import { Request, Response } from "express";

const getAllDonorFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["availability", "bloodType", "searchTerm"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await donorService.getAllDonorFromDB(filters, options);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Donors successfully found",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(
  async (req: Request , res: Response) => {
    const { id } = req.params;
    const result = await donorService.getByIdFromDB(id);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Donor Retrieve Successfully",
      data: result,
    });
  }
);
const requestDonorForBlood = catchAsync(
  async (req: Request & {user?:any} , res: Response) => {
    const result = await donorService.requestDonorForBlood(req.body, req.user);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: "Request successfully made",
      data: result,
    });
  }
);

const getMyDonationRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await donorService.getMyDonationRequest( req.user);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Donation requests retrieved successfully",
      data: result,
    });
  }
);
const getMyRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await donorService.getMyRequest( req.user);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "My requests retrieved successfully",
      data: result,
    });
  }
);
const updateRequesterRequest = catchAsync(
  async (req: Request , res: Response) => {
    const {requestId}=req.params
    
    const result = await donorService.updateRequesterRequest(req.body,requestId);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Donation request status successfully updated",
      data: result,
    });
  }
);

export const donorController = {
  getAllDonorFromDB,
  requestDonorForBlood,
  getMyDonationRequest,
  getMyRequest,
  updateRequesterRequest,
  getByIdFromDB
};
