import { z } from "zod";

export const getCourseFeedSchema = z.object({
  params: z.object({
    courseId: z.coerce.number().int().positive(),
  }),

  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(10),
  }),

  body: z.object({}),
});

export const savePostSchema = z.object({
  params: z.object({
    postId: z.coerce.number().int().positive(),
  }),

  query: z.object({}),

  body: z.object({}),
});

export const getSavedPostsSchema = z.object({
  params: z.object({}),

  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(10),
  }),

  body: z.object({}),
});
