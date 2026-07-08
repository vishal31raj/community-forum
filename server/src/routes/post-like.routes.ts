import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

import { likePost, unlikePost } from "../controllers/post-like.controller";

import {
  likePostSchema,
  unlikePostSchema,
} from "../validators/post-like.validators";

const router = Router();

router.use(authenticate);

router.post("/posts/:postId/like", validate(likePostSchema), likePost);

router.delete("/posts/:postId/like", validate(unlikePostSchema), unlikePost);

export default router;
