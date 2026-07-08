import { and, count, desc, eq, isNull } from "drizzle-orm";

import { db } from "../config/database";

import { comments } from "../db/schema/comment.schema";
import { users } from "../db/schema/user.schema";

export async function findCommentById(commentId: number) {
  const [comment] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, commentId));

  return comment ?? null;
}

export async function getComments(
  postId: number,
  page: number,
  pageSize: number,
) {
  return db
    .select({
      id: comments.id,
      body: comments.body,
      createdAt: comments.createdAt,

      author: {
        id: users.id,
        name: users.name,
      },
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function countComments(postId: number) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(comments)
    .where(eq(comments.postId, postId));

  return result.count;
}

export async function createComment(data: {
  postId: number;
  userId: number;
  body: string;
}) {
  console.log(data);
  const [comment] = await db.insert(comments).values(data).returning();

  return comment;
}

export async function deleteComment(commentId: number) {
  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, commentId))
    .returning();

  return comment ?? null;
}
