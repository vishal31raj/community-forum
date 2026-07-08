import { Request, Response, NextFunction } from "express";
import { getCoursesService } from "../services/course.service";

export async function getCourses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const courses = await getCoursesService(req.user!.id, req.user!.role);

    res.json(courses);
  } catch (error) {
    next(error);
  }
}
