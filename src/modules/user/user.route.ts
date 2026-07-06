import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.patch(
  "/me",
  auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  UserController.updateMyProfile
);

router.get(
  "/",
  auth(Role.ADMIN),
  UserController.getAllUsers
);

router.get(
  "/:id",
  auth(Role.ADMIN),
  UserController.getSingleUser
);

router.patch(
  "/:id/status",
  auth(Role.ADMIN),
  UserController.updateUserStatus
);

export const userRoutes = router