import axios from "axios";
import qs from "qs";
import crypto from "crypto";

import { Prisma } from "../../../generated/prisma/browser";
import {
  BookingStatus,
  PaymentStatus,
} from "../../../generated/prisma/enums";

import { prisma } from "../../lib/prisma";
import config from "../../config";
import { TCreatePayment } from "./payment.interface";

const createPayment = async (
  customerId: string,
  payload: TCreatePayment
) => {
  // Check booking
  const booking = await prisma.booking.findFirst({
    where: {
      id: payload.bookingId,
      customerId,
      status: BookingStatus.ACCEPTED,
    },
    include: {
      customer: true,
      service: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error(
      "Booking not found or booking is not accepted."
    );
  }

  // Prevent duplicate payment
  const existingPayment = await prisma.payment.findUnique({
    where: {
      bookingId: booking.id,
    },
  });

  if (existingPayment) {
    throw new Error(
      "Payment already exists for this booking."
    );
  }

  // Generate Transaction ID
  const transactionId =
    "TXN-" +
    Date.now() +
    "-" +
    crypto.randomBytes(4).toString("hex");

  // Save Payment
  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      customerId,
      provider: payload.provider,
      amount: new Prisma.Decimal(booking.totalAmount),
      transactionId,
      status: PaymentStatus.PENDING,
    },
  });

  // SSLCommerz Payload
  const paymentData = {
    store_id: config.SSLCOMMERZ_STORE_ID,
    store_passwd: config.SSLCOMMERZ_STORE_PASSWORD,

    total_amount: Number(booking.totalAmount),
    currency: "BDT",

    tran_id: transactionId,

    success_url: `${config.app_url}/api/payments/success`,

    fail_url: `${config.app_url}/api/payments/fail`,

    cancel_url: `${config.app_url}/api/payments/cancel`,

    ipn_url: `${config.app_url}/api/payments/ipn`,

    shipping_method: "NO",

    product_name: booking.service.title,

    product_category: booking.service.category.name,

    product_profile: "general",

    cus_name: booking.customer.name,
    cus_email: booking.customer.email,
    cus_add1: booking.address,
    cus_add2: "",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1207",
    cus_country: "Bangladesh",
    cus_phone:
      booking.customer.phone ?? "01700000000",
    cus_fax: "",

    ship_name: booking.customer.name,
    ship_add1: booking.address,
    ship_add2: "",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: "1207",
    ship_country: "Bangladesh",
  };

  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    qs.stringify(paymentData),
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.data?.GatewayPageURL) {
    throw new Error(
      "Failed to initialize SSLCommerz payment."
    );
  }

  return {
    transactionId,
    paymentUrl: response.data.GatewayPageURL,
  };
};

const confirmPayment = async (transactionId: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      transactionId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.status === PaymentStatus.COMPLETED) {
    return payment;
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedPayment = await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    });

    await tx.booking.update({
      where: {
        id: payment.bookingId,
      },
      data: {
        status: BookingStatus.PAID,
      },
    });

    return updatedPayment;
  });

  return result;
};

const failPayment = async (tranId: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      transactionId: tranId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      status: PaymentStatus.FAILED,
    },
  });
};

const getMyPayments = async (customerId: string) => {
  return prisma.payment.findMany({
    where: {
      customerId,
    },

    include: {
      booking: {
        include: {
          service: {
            include: {
              category: true,
            },
          },

          technician: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              profileImg: true,
            },
          },
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
          service: {
            include: {
              category: true,
            },
          },

          technician: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              profileImg: true,
            },
          },
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
  failPayment,
  getMyPayments,
  getSinglePayment,
};