import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { ServiceController } from "./service.controller";

const router = Router();

// Public
router.get("/", ServiceController.getServices);
router.get("/:id", ServiceController.getSingleService);

// Technician
router.post(
  "/",
  auth(Role.TECHNICIAN),
  ServiceController.createService
);

router.get(
  "/my-services",
  auth(Role.TECHNICIAN),
  ServiceController.getMyServices
);

router.put(
  "/:id",
  auth(Role.TECHNICIAN),
  ServiceController.updateService
);

router.delete(
  "/:id",
  auth(Role.TECHNICIAN),
  ServiceController.deleteService
);

export const ServiceRoutes = router;