import { findCourseById } from "../repositories/course.repository";

import { isUserEnrolled } from "../repositories/enrollment.repository";

import { countPosts, getCourseFeed } from "../repositories/post.repository";
import { httpError } from "../utils/http-error";

export async function getCourseFeedService(
  userId: number,
  userRole: string,
  courseId: number,
  page = 1,
  pageSize = 10,
) {
  const course = await findCourseById(courseId);

  if (!course) {
    throw httpError(404, "Course not found");
  }

  if (userRole === "student") {
    const enrolled = await isUserEnrolled(userId, courseId);

    if (!enrolled) {
      throw httpError(403, "You are not enrolled in this course");
    }
  }

  const [posts, total] = await Promise.all([
    getCourseFeed(courseId, userId, page, pageSize),
    countPosts(courseId),
  ]);

  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    data: posts,
  };
}
