import { z } from "zod";

export const getCommentsSchema = z.object({
  params: z.object({
    postId: z.coerce.number().int().positive(),
  }),

  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().max(100).optional(),
  }),

  body: z.object({}),
});

export const createCommentSchema = z.object({
  params: z.object({
    postId: z.coerce.number().int().positive(),
  }),

  query: z.object({}),

  body: z.object({
    body: z.string().trim().min(1).max(1000),
  }),
});

export const deleteCommentSchema = z.object({
  params: z.object({
    commentId: z.coerce.number().int().positive(),
  }),

  query: z.object({}),

  body: z.object({}),
});
