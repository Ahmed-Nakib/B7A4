import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";


const router = Router();

router.get(
  "/me",
  auth("CUSTOMER", "TECHNICIAN", "ADMIN"),
  UserController.getMyProfile
);

router.patch(
  "/me",
  auth("CUSTOMER", "TECHNICIAN", "ADMIN"),
  UserController.updateMyProfile
);

router.get(
  "/",
  auth("ADMIN"),
  UserController.getAllUsers
);

router.get(
  "/:id",
  auth("ADMIN"),
  UserController.getSingleUser
);

router.patch(
  "/:id/status",
  auth("ADMIN"),
  UserController.updateUserStatus
);

export const userRoutes = router;