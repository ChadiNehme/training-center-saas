import type { Request, Response } from "express";
import { createUser, getUsersByOrganization } from "./users.service.js";

export async function createUserController(req: Request, res: Response) {
    try {
        const organizationId = req.user?.organizationId;

        if (!organizationId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const user = await createUser(organizationId, req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Failed to create user"
        });
    }
}

export async function getUsersController(req: Request, res: Response) {
    try {
        const organizationId = req.user?.organizationId;

        if (!organizationId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const users = await getUsersByOrganization(organizationId);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Failed to get users"
        });
    }
}