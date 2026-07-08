import { findCourseById } from "../repositories/course.repository";
import { isUserEnrolled } from "../repositories/enrollment.repository";

import {
  countFeedPosts,
  createPost,
  deletePost,
  findPostById,
  getFeed,
  getPostById,
} from "../repositories/post.repository";

import { httpError } from "../utils/http-error";

export async function createPostService(
  userId: number,
  userRole: string,
  data: {
    courseId: number;
    title: string;
    body: string;
  },
) {
  if (userRole !== "student") {
    throw httpError(403, "Only students can create posts");
  }

  const course = await findCourseById(data.courseId);

  if (!course) {
    throw httpError(404, "Course not found");
  }

  const enrolled = await isUserEnrolled(userId, data.courseId);

  if (!enrolled) {
    throw httpError(403, "Not enrolled in this course");
  }

  const post = await createPost({
    userId,

    courseId: data.courseId,

    title: data.title,

    body: data.body,
  });

  return post;
}

export async function getFeedService(userId: number, role: string, page = 1, pageSize = 10) {
  const [posts, total] = await Promise.all([
    getFeed(userId, role, page, pageSize),
    countFeedPosts(userId),
  ]);

  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    data: posts,
  };
}

export async function deletePostService(
  userId: number,
  userRole: string,
  postId: number,
) {
  const post = await findPostById(postId);

  if (!post) {
    throw httpError(404, "Post not found");
  }

  // Moderator can delete anyone's post

  if (userRole === "moderator") {
    const deleted = await deletePost(postId, post.userId);

    return deleted;
  }

  // Student can delete only own post

  if (userRole === "student" && post.userId !== userId) {
    throw httpError(403, "You can delete only your own posts");
  }

  const deleted = await deletePost(postId, userId);

  return deleted;
}

export async function getPostService(
  userId: number,
  userRole: string,
  postId: number,
) {
  const post = await getPostById(postId, userId);

  if (!post) {
    throw httpError(404, "Post not found");
  }

  if (userRole === "student") {
    const enrolled = await isUserEnrolled(userId, post.course.id);

    if (!enrolled) {
      throw httpError(403, "Not enrolled in this course");
    }
  }

  return post;
}
