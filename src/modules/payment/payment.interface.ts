import {
  PaymentProvider,
  PaymentStatus,
} from "../../../generated/prisma/enums";

export type TCreatePayment = {
  bookingId: string;
  provider: PaymentProvider;
};

export type TConfirmPayment = {
  transactionId: string;
  status: PaymentStatus;
};