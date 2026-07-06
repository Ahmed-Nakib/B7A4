import { prisma } from "../../lib/prisma";
import { UserStatus } from "../../../generated/prisma/enums";

const updateMyProfile = async (
  userId: string,
  payload: Record<string, any>
) => {
  const { role, status, password, ...safeData } = payload;

  return prisma.user.update({
    where: { id: userId },
    data: safeData,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      profileImg: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });
};

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

const getSingleUser = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phone: true,
      profileImg: true,
      createdAt: true,
    },
  });
};

const updateUserStatus = async (
  id: string,
  status: UserStatus
) => {
  return prisma.user.update({
    where: { id },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });
};

export const UserService = {
  updateMyProfile,
  getAllUsers,
  getSingleUser,
  updateUserStatus,
};