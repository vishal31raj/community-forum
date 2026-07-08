import { Request, Response } from "express";

import {
  createCommentService,
  deleteCommentService,
  getCommentsService,
} from "../services/comment.service";

export async function getComments(req: Request, res: Response) {
  const { id, role } = req.user!;

  const postId = Number(req.params.postId);

  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 10);

  const comments = await getCommentsService(id, role, postId, page, pageSize);

  res.json(comments);
}

export async function createComment(req: Request, res: Response) {
  const { id, role } = req.user!;

  const postId = Number(req.params.postId);

  const { body } = req.body;

  const comment = await createCommentService(id, role, postId, body);

  res.status(201).json({
    message: "Comment created successfully",
    data: comment,
  });
}

export async function deleteComment(req: Request, res: Response) {
  const { id, role } = req.user!;

  const commentId = Number(req.params.commentId);

  const result = await deleteCommentService(id, role, commentId);

  res.json(result);
}
