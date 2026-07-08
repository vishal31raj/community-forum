import { Router } from "express";

import {
  createPost,
  deletePost,
  getFeed,
  getPost,
} from "../controllers/post.controller";

import {
  getSavedPosts,
  savePost,
  unsavePost,
} from "../controllers/saved-post.controller";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

import {
  createPostSchema,
  deletePostSchema,
  getFeedSchema,
  getPostSchema,
  getSavedPostsSchema,
  savePostSchema,
} from "../validators/post.validator";
import { getUsers } from "../controllers/user.controller";
import { getCourses } from "../controllers/course.controller";

const router = Router();

router.get("/users", getUsers);

router.use(authenticate);

router.get("/courses", getCourses);

router.get("/feed", validate(getFeedSchema), getFeed);

router.post("/posts/create", validate(createPostSchema), createPost);

router.post("/posts/:postId/save", validate(savePostSchema), savePost);

router.delete("/posts/:postId/save", validate(savePostSchema), unsavePost);

router.get("/me/saved-posts", validate(getSavedPostsSchema), getSavedPosts);

router.delete("/posts/:postId", validate(deletePostSchema), deletePost);

router.get("/posts/:postId", validate(getPostSchema), getPost);

export default router;
