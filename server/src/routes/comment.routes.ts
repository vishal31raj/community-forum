import { Router } from "express";

import { validate } from "../middleware/validation.middleware";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller";
import { authenticate } from "../middleware/auth.middleware";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsSchema,
} from "../validators/comment.validators";

const router = Router();

router.use(authenticate);

router.get("/posts/:postId/comments", validate(getCommentsSchema), getComments);

router.post(
  "/posts/:postId/comments",
  validate(createCommentSchema),
  createComment,
);

router.delete(
  "/comments/:commentId",
  validate(deleteCommentSchema),
  deleteComment,
);

export default router;
