import { Request, Response, NextFunction } from "express";

import {
  savePostService,
  unsavePostService,
  getSavedPostsService,
} from "../services/saved-post.service";

export async function savePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const postId = Number(req.params.postId);

    const savedPost = await savePostService(req.user!.id, postId);

    res.status(200).json({
      message: "Post saved successfully",
      data: savedPost,
    });
  } catch (error) {
    next(error);
  }
}

export async function unsavePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const postId = Number(req.params.postId);

    await unsavePostService(req.user!.id, postId);

    res.status(200).json({
      message: "Post removed from saved posts",
    });
  } catch (error) {
    next(error);
  }
}

export async function getSavedPosts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 10);

    const posts = await getSavedPostsService(req.user!.id, page, pageSize);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}
