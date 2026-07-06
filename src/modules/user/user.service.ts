import { prisma } from "../../lib/prisma";



const getMyProfile = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};



const updateMyProfile = async (
  userId: string,
  payload: Record<string, any>
) => {
  return prisma.user.update({
    where: { id: userId },
    data: payload,
  });
};



const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};



const getSingleUser = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};



const updateUserStatus = async (
  id: string,
  status: any
) => {
  return prisma.user.update({
    where: { id },
    data: { status },
  });
};


export const UserService = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getSingleUser,
  updateUserStatus,
};