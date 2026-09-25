import type { NextFunction, Request, Response } from "express";

export function requireRole(...allowedRoles: string[]) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();
  };
}