import { Router } from "express";

import { deletePost, getCourseFeed } from "../controllers/post.controller";

import {
  getSavedPosts,
  savePost,
  unsavePost,
} from "../controllers/saved-post.controller";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

import {
  deletePostSchema,
  getCourseFeedSchema,
  getSavedPostsSchema,
  savePostSchema,
} from "../validators/post.validator";
import { getUsers } from "../controllers/user.controller";
import { getCourses } from "../controllers/course.controller";

const router = Router();

router.get("/users", getUsers);

router.get("/courses", getCourses);

router.use(authenticate);

router.get(
  "/courses/:courseId/posts",
  validate(getCourseFeedSchema),
  getCourseFeed,
);

router.post("/posts/:postId/save", validate(savePostSchema), savePost);

router.delete("/posts/:postId/save", validate(savePostSchema), unsavePost);

router.get("/me/saved-posts", validate(getSavedPostsSchema), getSavedPosts);

router.delete("/posts/:postId", validate(deletePostSchema), deletePost);

export default router;
