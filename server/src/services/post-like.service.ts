import { findPostById } from "../repositories/post.repository";
import {
  hasLikedPost,
  likePost,
  unlikePost,
} from "../repositories/post-like.repository";
import { isUserEnrolled } from "../repositories/enrollment.repository";
import { httpError } from "../utils/http-error";

export async function likePostService(
  userId: number,
  userRole: string,
  postId: number,
) {
  const post = await findPostById(postId);

  if (!post) {
    throw httpError(404, "Post not found");
  }

  if (userRole === "student") {
    const enrolled = await isUserEnrolled(userId, post.courseId);

    if (!enrolled) {
      throw httpError(403, "Not enrolled in this course");
    }
  }

  const existing = await hasLikedPost(postId, userId);

  if (existing) {
    throw httpError(409, "Post already liked");
  }

  return likePost(postId, userId);
}

export async function unlikePostService(
  userId: number,
  userRole: string,
  postId: number,
) {
  const post = await findPostById(postId);

  if (!post) {
    throw httpError(404, "Post not found");
  }

  if (userRole === "student") {
    const enrolled = await isUserEnrolled(userId, post.courseId);

    if (!enrolled) {
      throw httpError(403, "Not enrolled in this course");
    }
  }

  const existing = await hasLikedPost(postId, userId);

  if (!existing) {
    throw httpError(404, "Like not found");
  }

  await unlikePost(postId, userId);
}
