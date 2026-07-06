import crypto from "crypto";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  TConfirmPayment,
  TCreatePayment,
} from "./payment.interface";

const createPayment = async (
  customerId: string,
  payload: TCreatePayment
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: payload.bookingId,
      customerId,
      status: "ACCEPTED",
    },
  });

  if (!booking) {
    throw new Error(
      "Booking not found or not accepted yet."
    );
  }

  const paymentExist = await prisma.payment.findUnique({
    where: {
      bookingId: booking.id,
    },
  });

  if (paymentExist) {
    throw new Error("Payment already exists.");
  }

  const transactionId =
    "TXN-" +
    Date.now() +
    "-" +
    crypto.randomBytes(4).toString("hex");

  return prisma.payment.create({
    data: {
      bookingId: booking.id,
      customerId,
      amount: booking.totalAmount,
      provider: payload.provider,
      transactionId,
    },
  });
};

const confirmPayment = async (
  payload: TConfirmPayment
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      transactionId: payload.transactionId,
    },
    include: {
      booking: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  const result = await prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      status: payload.status,
      paidAt:
        payload.status === PaymentStatus.COMPLETED
          ? new Date()
          : null,
    },
  });

  if (payload.status === PaymentStatus.COMPLETED) {
    await prisma.booking.update({
      where: {
        id: payment.bookingId,
      },
      data: {
        status: "PAID",
      },
    });
  }

  return result;
};

const getMyPayments = async (
  customerId: string
) => {
  return prisma.payment.findMany({
    where: {
      customerId,
    },
    include: {
      booking: {
        include: {
          service: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSinglePayment = async (
  customerId: string,
  paymentId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      customerId,
    },
    include: {
      booking: {
        include: {
          service: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return payment;
};

export const PaymentService = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getSinglePayment,
};