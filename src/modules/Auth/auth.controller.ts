import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { AUTH_MESSAGE } from "./auth.constant";
import  httpStatus  from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: AUTH_MESSAGE.REGISTER_SUCCESS,
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: false, 
    sameSite: "lax",
   maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false, 
    sameSite: "lax",
     maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: AUTH_MESSAGE.LOGIN_SUCCESS,
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    },
  });
});


const refreshToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    const { accessToken } = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Token refreshed successfully",
      data: {
        accessToken,
      },
    });
  }
);


const getMe = catchAsync(async (req: any, res: Response) => {
  const result = await AuthService.getMe(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: AUTH_MESSAGE.PROFILE_SUCCESS,
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  refreshToken,
  getMe,
};