import { Request, Response, NextFunction } from "express";

import { getCourseFeedService } from "../services/post.service";

export async function getCourseFeed(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { courseId } = req.validated!.params as { courseId: number };

    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 10);

    const result = await getCourseFeedService(
      req.user!.id,
      req.user!.role,
      courseId,
      page,
      pageSize,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
