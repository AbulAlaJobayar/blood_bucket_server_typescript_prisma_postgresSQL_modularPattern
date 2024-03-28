import config from "../../config";
import prisma from "../../shared/prisma";
import { TUser } from "./user.constants";
import * as bcrypt from "bcrypt";

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
    };

    //create UserProfile
    const userProfile = await transactionClient.userProfile.create({
      data: profileData,
    });
    //find Data to show response
    const findData:any = await transactionClient.user.findUnique({
      where: {
        id: createUser.id,
      },
      include: {
        userProfile: true,
      },
    });
    return findData;
   
  });
  const {password,...rest}=result

  return rest;
};

export const userService = {
  createUserIntoDB,
};
