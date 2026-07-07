import type { PaginatedResponse, Post } from "../types/post";
import api from "./axios";

export interface Course {
  id: number;
  title: string;
}

export async function getCourses(): Promise<Course[]> {
  const { data } = await api.get<Course[]>("/courses");
  return data;
}

export async function getCourseFeed(
  courseId: number,
  page = 1,
  pageSize = 10,
): Promise<PaginatedResponse<Post>> {
  const { data } = await api.get(`/courses/${courseId}/posts`, {
    params: {
      page,
      pageSize,
    },
  });

  return data;
}
