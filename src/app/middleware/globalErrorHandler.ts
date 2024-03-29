import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let success = error.status || false;
  let message = error.message || `something wen't wrong`;
  let errorDetails = error.issues || [];
  if (error instanceof ZodError) {
    const issues = error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }));
    status = httpStatus.BAD_REQUEST;
    (success = false),
      (message = error.issues.map((error: any) => error.message).join(". ")),
      (errorDetails = { issues });
  }

  res.status(status).json({
    success,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
