import { prisma } from "../../lib/prisma";
import { TCreateService, TUpdateService } from "./service.interface";

const createService = async (
  userId: string,
  payload: TCreateService
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.service.create({
    data: {
      title: payload.title,
      description: payload.description,
      price: payload.price,
      duration: payload.duration,
      technicianId: technician.id,
      categoryId: payload.categoryId,
    },
    include: {
      category: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
  });
};

const getServices = async () => {
  return prisma.service.findMany({
    where: {
      isAvailable: true,
    },
    include: {
      category: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleService = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

const getMyServices = async (userId: string) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  return prisma.service.findMany({
    where: {
      technicianId: technician.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateService = async (
  userId: string,
  serviceId: string,
  payload: TUpdateService
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      technicianId: technician.id,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  return prisma.service.update({
    where: {
      id: serviceId,
    },
    data: payload,
    include: {
      category: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
  });
};

const deleteService = async (
  userId: string,
  serviceId: string
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      technicianId: technician.id,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });

  return null;
};

export const ServiceService = {
  createService,
  getServices,
  getSingleService,
  getMyServices,
  updateService,
  deleteService,
};