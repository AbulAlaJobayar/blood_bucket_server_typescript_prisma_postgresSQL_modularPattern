import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../shared/prisma";
import * as bcrypt from "bcrypt";
import { jwtHelper } from "../../helper/jwtHelper";
import config from "../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  //find valid user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  //check password
  const checkPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!checkPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "Password is incorrect");
  }
  // Token Data
  const tokenData = {
    name: userData.name,
    email: userData.email,
  };

  const accessToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_access_expire_in as string
  );
  const refreshToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expire_in as string
  );
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    token: accessToken,
    refreshToken,
  };
};

export const authService = {
  loginUser,
};
