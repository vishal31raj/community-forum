import type { Course } from "./course";

export interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  savesCount: number;
  likesCount: number;
  commentsCount: number;
  hasSaved: boolean;
  author: {
    id: Number;
    name: String;
  };
}

export interface PaginatedResponse<T> {
  course: Course;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  data: T[];
}
