import { z } from "zod";

export const getFeedSchema = z.object({
  params: z.object({}),

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

export const deletePostSchema = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({
    postId: z.coerce.number().int().positive(),
  }),
});

export const createPostSchema = z.object({
  body: z.object({
    courseId: z.number().int().positive(),
    title: z.string().min(5).max(255),
    body: z.string().min(10),
  }),
  params: z.object({}),
  query: z.object({}),
});

export const getPostSchema = z.object({
  params: z.object({
    postId: z.coerce.number().positive(),
  }),

  query: z.object({}),

  body: z.object({}),
});
