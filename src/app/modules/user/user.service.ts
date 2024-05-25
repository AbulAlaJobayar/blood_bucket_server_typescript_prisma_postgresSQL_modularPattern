import { UserProfile } from "@prisma/client";
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
      donateblood:payload.donateblood
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
      userProfile:true
    },
  });
  return result;
};

const updateUserProfile=async(payload:Partial<UserProfile>,user:JwtPayload)=>{

  const result=await prisma.userProfile.update({
  where:{
    userId:user.id
  },
  data:payload
})
return result
}

export const userService = {
  createUserIntoDB,
  getMyProfileIntoDB,
  updateUserProfile
};
