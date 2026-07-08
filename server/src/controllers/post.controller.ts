import { Request, Response, NextFunction } from "express";

import {
  createPostService,
  deletePostService,
  getCourseFeedService,
  getPostService,
} from "../services/post.service";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = req.body;
    const user = req.user!;
    const post = await createPostService(user.id, user.role, data);

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

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

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { postId } = req.params;

    await deletePostService(req.user!.id, req.user!.role, Number(postId));

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function getPost(req: Request, res: Response) {
  const { id, role } = req.user!;

  const postId = Number(req.params.postId);

  const post = await getPostService(id, role, postId);

  res.json(post);
}
