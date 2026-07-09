import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";
import jwt from "jsonwebtoken";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  // Custom Errors
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Prisma Errors
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    statusCode = httpStatus.CONFLICT;
    message = "Duplicate value found.";
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2003"
  ) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Cannot delete because related data exists.";
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error.";
  }

  // JWT Errors
  if (err instanceof jwt.TokenExpiredError) {
    statusCode = httpStatus.UNAUTHORIZED;
    message = "Token has expired. Please login again.";
  }

  if (err instanceof jwt.JsonWebTokenError) {
    statusCode = httpStatus.UNAUTHORIZED;
    message = "Invalid token.";
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};