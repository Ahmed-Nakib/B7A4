import { prisma } from "../../lib/prisma";
import slugify from "slugify";
import { UserStatus } from "../../../generated/prisma/enums";



const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      profileImg: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

const updateUserStatus = async (id: string, status: UserStatus) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: {
      id,
    },

    data: {
      status,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });
};


const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      technician: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      service: {
        select: {
          id: true,
          title: true,
          price: true,
        },
      },

      payment: true,
      review: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};



const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};


export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getCategories,
};
