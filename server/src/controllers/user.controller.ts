import { Request, Response, NextFunction } from "express";
import { getUsersService } from "../services/user.service";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getUsersService();

    res.json(users);
  } catch (error) {
    next(error);
  }
}
