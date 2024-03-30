import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../helper/jwtHelper";
import config from "../config";
import {  Secret } from "jsonwebtoken";

const auth = (...role: string[]) => {
  return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "No JWT is provided in the request headers"
        );
      }
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_access_secret as Secret
      );
      req.user = verifiedUser 
      next()
    } catch (error) {
      next(error);
    }
  };
};
export default auth