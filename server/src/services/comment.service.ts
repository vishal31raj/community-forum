import { findPostById } from "../repositories/post.repository";
import { isUserEnrolled } from "../repositories/enrollment.repository";
import {
  countComments,
  createComment,
  deleteComment,
  findCommentById,
  getComments,
} from "../repositories/comment.repository";
import { httpError } from "../utils/http-error";

export async function getCommentsService(
  userId: number,
  userRole: string,
  postId: number,
  page = 1,
  pageSize = 10,
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

  const [comments, total] = await Promise.all([
    getComments(postId, page, pageSize),
    countComments(postId),
  ]);

  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    data: comments,
  };
}

export async function createCommentService(
  userId: number,
  userRole: string,
  postId: number,
  body: string,
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

  return createComment({
    userId,
    postId,
    body,
  });
}

export async function deleteCommentService(
  userId: number,
  userRole: string,
  commentId: number,
) {
  const comment = await findCommentById(commentId);

  if (!comment) {
    throw httpError(404, "Comment not found");
  }

  if (userRole !== "moderator" && comment.userId !== userId) {
    throw httpError(403, "You can delete only your own comments");
  }

  await deleteComment(commentId);

  return {
    message: "Comment deleted successfully",
  };
}
