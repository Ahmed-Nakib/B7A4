import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const updateMyProfile = catchAsync(async (req: any, res: Response) => {
  const result = await UserService.updateMyProfile(
    req.user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUserStatus(
    req.params.id as string,
    req.body.status
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: result,
  });
});

export const UserController = {
  updateMyProfile,
  getAllUsers,
  getSingleUser,
  updateUserStatus,
};