import { Prisma, RequestStatus, User } from "@prisma/client";
import prisma from "../../shared/prisma";
import paginationHelper, { TOption } from "../../helper/paginationHelper";
import {TRequestDonor } from "./donor.constant";
import { JwtPayload } from "jsonwebtoken";

const getAllDonorFromDB = async (query: any, options: TOption) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);
 
const { searchTerm, ...filterData } = query;

// convert string to boolean
if(filterData.availability && filterData.availability==="false"){
  filterData.availability=false
}

if(filterData.availability && filterData.availability ==="true"){
  filterData.availability=true
}

  const andCondition: Prisma.UserWhereInput[] = [];
  if (query.searchTerm) {
    andCondition.push({
      OR: ["name", "email", "location", "bloodType"].map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput = { AND: andCondition };
  const result = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      createdAt: true,
      updateAt: true,
      userProfile: true,
    },
  });
  const total = await prisma.user.count({
    where: whereCondition,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const requestDonorForBlood = async (
  payload: TRequestDonor,
  userInfo:JwtPayload
) => {
  const userData = {
    donorId: payload.donorId,
    requesterId: userInfo.id,
    phoneNumber: payload.phoneNumber,
    dateOfDonation: payload.dateOfDonation,
    hospitalName: payload.hospitalName,
    hospitalAddress: payload.hospitalAddress,
    reason: payload.reason,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    //create request
    const createRequest = await transactionClient.request.create({
      data: userData,
    });
    //find Donor
    const donor = await transactionClient.user.findUnique({
      where: {
        id: payload.donorId,
      },
      include: {
        userProfile: true,
      },
    });
    // send response without requesterId and  password
    const { requesterId, ...other } = createRequest;
    const { password, ...rest } = donor as User;
    return { other, rest };
  });

  return {
    id: result.other.id,
    donorId: result.other.donorId,
    phoneNumber: result.other.phoneNumber,
    dateOfDonation: result.other.dateOfDonation,
    hospitalName: result.other.hospitalName,
    hospitalAddress: result.other.hospitalAddress,
    reason: result.other.reason,
    requestStatus: result.other.requestStatus,
    createdAt: result.other.createdAt,
    updatedAt: result.other.createdAt,
    donor: result.rest,
  };
};
const getMyDonationRequest = async (payload: JwtPayload) => {
  const result: any = await prisma.request.findMany({
    where: {
      donorId: payload.id,
    },
    select: {
      id: true,
      donorId: true,
      requesterId: true,
      phoneNumber: true,
      dateOfDonation: true,
      hospitalName: true,
      hospitalAddress: true,
      reason: true,
      requestStatus: true,
      createdAt: true,
      updateAt: true,
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          bloodType: true,
          availability: true,
        },
      },
    },
  });

  return result;
};

const updateRequesterRequest = async (
  payload: { status: RequestStatus },
  id: any
) => {
  console.log(payload.status, id.requestId);
  const result = await prisma.request.update({
    where: {
      id: id,
    },
    data: {
      requestStatus: payload.status,
    },
  });
  return result;
};

export const donorService = {
  getAllDonorFromDB,
  requestDonorForBlood,
  getMyDonationRequest,
  updateRequesterRequest,
};
