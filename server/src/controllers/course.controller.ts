import { Request, Response, NextFunction } from "express";
import { getCoursesService } from "../services/course.service";

export async function getCourses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const courses = await getCoursesService();

    res.json(courses);
  } catch (error) {
    next(error);
  }
}