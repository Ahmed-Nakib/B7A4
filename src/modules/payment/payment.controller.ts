import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req: any, res: Response) => {
  const result = await PaymentService.createPayment(
    req.user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Payment session created successfully",
    data: result,
  });
});

const confirmPayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentService.confirmPayment(
      req.body.transactionId
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment confirmed successfully",
      data: result,
    });
  }
);


const failPayment = catchAsync(async (req: Request, res: Response) => {
  await PaymentService.failPayment(req.body.tran_id);

  res.redirect(
    "http://localhost:3000/payment/fail"
  );
});

const getMyPayments = catchAsync(async (req: any, res: Response) => {
  const result = await PaymentService.getMyPayments(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: any, res: Response) => {
  const result = await PaymentService.getSinglePayment(
    req.user.id,
    req.params.id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment retrieved successfully",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  confirmPayment,
  failPayment,
  getMyPayments,
  getSinglePayment,
};