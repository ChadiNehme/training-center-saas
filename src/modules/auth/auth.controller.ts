import type { Request, Response } from "express";
import { login, register } from "./auth.service.js";

export async function registerController(req: Request, res: Response) {
    try {
        const result = await register(req.body);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Registration failed"
        });
    }
}

export async function loginController(req: Request, res: Response) {
    try {
        const result = await login(req.body);

        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({
            message: error instanceof Error ? error.message : "Login failed"
        });
    }
}