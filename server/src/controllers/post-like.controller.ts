import { Request, Response } from "express";

import {
  likePostService,
  unlikePostService,
} from "../services/post-like.service";

export async function likePost(req: Request, res: Response) {
  const { id, role } = req.user!;

  const postId = Number(req.params.postId);

  const like = await likePostService(id, role, postId);

  res.status(201).json({
    message: "Post liked successfully",
    data: like,
  });
}

export async function unlikePost(req: Request, res: Response) {
  const { id, role } = req.user!;

  const postId = Number(req.params.postId);

  await unlikePostService(id, role, postId);

  res.json({
    message: "Post unliked successfully",
  });
}
