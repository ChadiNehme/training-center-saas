import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
    loginController,
    registerController
} from "./auth.controller.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You reached a protected route",
        user: req.user
    });
});
export default router;