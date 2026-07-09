import httpStatus from "http-status";
import slugify from "slugify";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: {
  name: string;
  icon?: string;
  description?: string;
}) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (isCategoryExist) {
    const error: any = new Error("Category already exists");
    error.statusCode = httpStatus.CONFLICT;
    throw error;
  }

  const slug = slugify(payload.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  return prisma.category.create({
    data: {
      name: payload.name,
      slug,
      icon: payload.icon,
      description: payload.description,
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

const updateCategory = async (
  id: string,
  payload: {
    name: string;
    icon?: string;
    description?: string;
  }
) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    const error: any = new Error("Category not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const slug = slugify(payload.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const isCategoryExist = await prisma.category.findFirst({
    where: {
      slug,
      NOT: {
        id,
      },
    },
  });

  if (isCategoryExist) {
    const error: any = new Error("Category already exists");
    error.statusCode = httpStatus.CONFLICT;
    throw error;
  }

  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name: payload.name,
      slug,
      icon: payload.icon,
      description: payload.description,
    },
  });
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    const error: any = new Error("Category not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const service = await prisma.service.findFirst({
    where: {
      categoryId: id,
    },
  });

  if (service) {
    const error: any = new Error(
      "Cannot delete category because services exist under this category."
    );
    error.statusCode = httpStatus.BAD_REQUEST;
    throw error;
  }

  return prisma.category.delete({
    where: {
      id,
    },
  });
};

export const CategoryService = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};