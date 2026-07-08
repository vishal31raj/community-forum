import { and, eq } from "drizzle-orm";

import { db } from "../config/database";
import { postLikes } from "../db/schema/post-like.schema";

export async function hasLikedPost(postId: number, userId: number) {
  const [like] = await db
    .select()
    .from(postLikes)
    .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));

  return like ?? null;
}

export async function likePost(postId: number, userId: number) {
  const [like] = await db
    .insert(postLikes)
    .values({
      postId,
      userId,
    })
    .returning();

  return like;
}

export async function unlikePost(postId: number, userId: number) {
  const [like] = await db
    .delete(postLikes)
    .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
    .returning();

  return like ?? null;
}
