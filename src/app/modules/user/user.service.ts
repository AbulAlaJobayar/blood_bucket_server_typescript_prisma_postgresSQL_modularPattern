import { Prisma } from "@prisma/client";
import config from "../../config";
import prisma from "../../shared/prisma";
import { TUser } from "./user.constants";
import * as bcrypt from "bcrypt";
import paginationHelper, { TOption } from "../../helper/paginationHelper";

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


const getAllDonorFromDB = async (query: any,options:TOption) => {
 const {limit,page,skip,sortBy,sortOrder}=paginationHelper(options)
  if(query.bloodType){
  const bloodOptimize=query?.bloodType
  const finalBlood=bloodOptimize.slice(0,1);
  query.bloodType=finalBlood
 }
  const {searchTerm,...filterData}=query
  const andCondition:Prisma.UserWhereInput[] = [];
  if (query.searchTerm) {
    andCondition.push({
      OR:['name','email','location','bloodType'].map((field)=>({
        [field]:{
          contains:query.searchTerm,
          mode:"insensitive"
        }
      }))
    });
  }
 if(Object.keys(filterData).length>0){
  andCondition.push({
    AND:Object.keys(filterData).map((key)=>({
      [key]:{
        contains:filterData[key]
      }
    }))
  })
 }


const whereCondition:Prisma.UserWhereInput={AND:andCondition}
  const result = await prisma.user.findMany({
    where: whereCondition,
    skip, 
    take:limit,
    orderBy:{
      [sortBy]:sortOrder
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
const total= await prisma.user.count({
  where:whereCondition
})
  return {
    meta:{
      page,
      limit,
      total
    },
    data:result
  };
};

export const userService = {
  createUserIntoDB,
  getAllDonorFromDB,
};
