import { } from "@prisma/client";
import { Role, UserStatus } from "../../../generated/prisma/enums";

export interface IUserFilters {
  searchTerm?: string;
  role?: Role;
  status?: UserStatus;
}

export interface IUpdateProfile {
  name?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

export interface IUpdateUserStatus {
  status: UserStatus;
}