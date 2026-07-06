import { UserStatus } from "../../../generated/prisma/enums";



export interface IUpdateUserStatus {
  status: UserStatus;
}


export interface ICreateCategory {
  name: string;
  icon?: string;
  description?: string;
}



export interface IUpdateCategory {
  name?: string;
  icon?: string;
  description?: string;
}


interface IUserFilters {
  searchTerm?: string;
  role?: string;
  status?: UserStatus;
}



export interface IBookingFilters {
  status?: string;
  customerId?: string;
  technicianId?: string;
}