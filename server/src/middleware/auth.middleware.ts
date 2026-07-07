import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

import { db } from "../config/database";
import { users } from "../db/schema/user.schema";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.header("x-user-id");

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const parsedUserId = Number(userId);

    if (Number.isNaN(parsedUserId)) {
      return res.status(401).json({
        message: "Invalid user id",
      });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, parsedUserId));

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}