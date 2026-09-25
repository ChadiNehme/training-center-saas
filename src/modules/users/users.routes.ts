import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { createUserController, getUsersController } from "./users.controller.js";
import { requireRole } from "../../middleware/role.middleware.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    requireRole("OWNER", "ADMIN"),
    createUserController
);

router.get(
    "/",
    authMiddleware,
    requireRole("OWNER", "ADMIN"),
    getUsersController
);

export default router;