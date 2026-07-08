import { z } from "zod";

export const likePostSchema = z.object({
  params: z.object({
    postId: z.coerce.number().positive(),
  }),

  query: z.object({}),

  body: z.object({}),
});

export const unlikePostSchema = likePostSchema;
