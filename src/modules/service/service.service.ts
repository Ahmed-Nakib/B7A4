import { Prisma } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";
import { TCreateService } from "./service.interface";

const createService = async (
  userId: string,
  payload: TCreateService
) => {
  // Check technician profile
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  // Check category
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
      price: new Prisma.Decimal(payload.price),
      duration: payload.duration,
      technicianId: technician.id,
      categoryId: payload.categoryId,
    },

    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
        },
      },

      technician: {
        select: {
          id: true,
          bio: true,
          experience: true,
          location: true,
          averageRating: true,
          completedJobs: true,

          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImg: true,
            },
          },
        },
      },
    },
  });
};

const getServices = async (query: any) => {
  const {
    search,
    category,
    location,
    rating,
    minPrice,
    maxPrice,
  } = query;

  return prisma.service.findMany({
    where: {
      isAvailable: true,

      //  Search by title or description
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

      // Filter by category name
      ...(category && {
        category: {
          name: {
            equals: category,
            mode: "insensitive",
          },
        },
      }),

      // Filter by technician location
      ...(location && {
        technician: {
          location: {
            contains: location,
            mode: "insensitive",
          },
        },
      }),

      // Filter by technician rating
      ...(rating !== undefined && {
        technician: {
          averageRating: {
            gte: Number(rating),
          },
        },
      }),

      // Filter by price range
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && {
            gte: new Prisma.Decimal(minPrice),
          }),
          ...(maxPrice !== undefined && {
            lte: new Prisma.Decimal(maxPrice),
          }),
        },
      }),
    },

    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
        },
      },

      technician: {
        select: {
          id: true,
          bio: true,
          experience: true,
          location: true,
          averageRating: true,
          completedJobs: true,

          user: {
            select: {
              id: true,
              name: true,
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

const getSingleService = async (serviceId: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
    include: {
      category: true,

      technician: {
        select: {
          id: true,
          bio: true,
          experience: true,
          location: true,
          averageRating: true,
          completedJobs: true,

          user: {
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
  payload: Partial<TCreateService>
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
    data: {
      ...(payload.title !== undefined && {
        title: payload.title,
      }),

      ...(payload.description !== undefined && {
        description: payload.description,
      }),

      ...(payload.price !== undefined && {
        price: new Prisma.Decimal(payload.price),
      }),

      ...(payload.duration !== undefined && {
        duration: payload.duration,
      }),

      ...(payload.categoryId !== undefined && {
        categoryId: payload.categoryId,
      }),

      ...(payload.isAvailable !== undefined && {
        isAvailable: payload.isAvailable,
      }),
    },
    include: {
      category: true,
      technician: {
        select: {
          id: true,
          bio: true,
          experience: true,
          location: true,
          averageRating: true,
          completedJobs: true,
          user: {
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