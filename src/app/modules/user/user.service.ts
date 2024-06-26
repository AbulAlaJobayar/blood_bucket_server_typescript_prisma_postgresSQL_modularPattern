import { User, UserProfile } from "@prisma/client";
import config from "../../config";
import prisma from "../../shared/prisma";
import { TUser } from "./user.constants";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round)
  );
  //user Data
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    bloodType: payload.bloodType,
    location: payload.location,
  };

  //transaction apply
  const result = await prisma.$transaction(async (transactionClient) => {
    //create User
    const createUser = await transactionClient.user.create({
      data: userData,
      include: {
        userProfile: true,
      },
    });
    //profile Data
    const profileData = {
      userId: createUser?.id,
      bio: payload.bio,
      age: payload.age,
      lastDonationDate: payload.lastDonationDate,
      donateblood: payload.donateblood,
    };

    //create UserProfile
    await transactionClient.userProfile.create({
      data: profileData,
    });
    //find Data to show response
    const findData: any = await transactionClient.user.findUnique({
      where: {
        id: createUser.id,
      },
      include: {
        userProfile: true,
      },
    });
    return findData;
  });
  const { password, ...rest } = result;

  return rest;
};

const getMyProfileIntoDB = async (user: JwtPayload) => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      bloodType: true,
      availability: true,
      userProfile: true,
    },
  });
  return result;
};
const getAllProfileIntoDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      role: true,
      accountStatus: true,
      bloodType: true,
      availability: true,
      userProfile: true,
    },
  });
  return result;
};

const updateUserProfile = async (
  payload:any,
  user: JwtPayload
) => {
  const userData = {
    name: payload?.name,
    bloodType: payload?.bloodType,
    location: payload?.location,
    availability: payload?.availability =="true" ? true : false ,
  };

  //transaction apply
  const result = await prisma.$transaction(async (transactionClient) => {
    //update User
    const updateUser = await transactionClient.user.update({
      where: {
        id: user.id,
      },
      data: userData,
    });
    //profile Data
    const profileData = {
      bio: payload?.bio,
      age: payload?.age,
      lastDonationDate: payload?.lastDonationDate,
      donateblood: payload?.donateblood,
    };

    //update UserProfile
   const updateUserProfile= await transactionClient.userProfile.update({
      where: {
        userId: user.id,
      },
      data: profileData,
    });
    //find Data to show response
   
    return {
      user:updateUser,
      userProfile:updateUserProfile
    };
  });
  return result;
};
const updateUserRole = async (payload: any, id: any) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllProfileIntoDB,
  getMyProfileIntoDB,
  updateUserProfile,
  updateUserRole,
};
