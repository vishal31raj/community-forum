import { and, desc, eq, isNull, sql } from "drizzle-orm";

import { db } from "../config/database";
import { savedPosts } from "../db/schema/saved-post.schema";
import { posts } from "../db/schema/post.schema";
import { users } from "../db/schema/user.schema";
import { courses } from "../db/schema/course.schema";

export async function findSavedPost(userId: number, postId: number) {
  const [savedPost] = await db
    .select()
    .from(savedPosts)
    .where(and(eq(savedPosts.userId, userId), eq(savedPosts.postId, postId)));

  return savedPost ?? null;
}

export async function findActiveSavedPost(userId: number, postId: number) {
  const [savedPost] = await db
    .select()
    .from(savedPosts)
    .where(
      and(
        eq(savedPosts.userId, userId),
        eq(savedPosts.postId, postId),
        isNull(savedPosts.deletedAt),
      ),
    );

  return savedPost ?? null;
}

export async function createSavedPost(userId: number, postId: number) {
  const [savedPost] = await db
    .insert(savedPosts)
    .values({
      userId,
      postId,
    })
    .returning();

  return savedPost;
}

export async function reactivateSavedPost(id: number) {
  const [savedPost] = await db
    .update(savedPosts)
    .set({
      deletedAt: null,
    })
    .where(eq(savedPosts.id, id))
    .returning();

  return savedPost;
}

export async function softDeleteSavedPost(id: number) {
  const [savedPost] = await db
    .update(savedPosts)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(savedPosts.id, id))
    .returning();

  return savedPost;
}

export async function countActiveSaves(postId: number) {
  const [result] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(savedPosts)
    .where(and(eq(savedPosts.postId, postId), isNull(savedPosts.deletedAt)));

  return Number(result.count);
}

export async function getSavedPosts(
  userId: number,
  page: number,
  pageSize: number,
) {
  return db
    .select({
      id: posts.id,

      title: posts.title,

      body: posts.body,

      createdAt: posts.createdAt,

      author: {
        id: users.id,
        name: users.name,
      },

      course: {
        id: courses.id,
        title: courses.title,
      },

      likesCount: sql<number>`
        (
          SELECT COUNT(*)
          FROM post_likes pl
          WHERE pl.post_id = ${posts.id}
        )
      `,

      commentsCount: sql<number>`
        (
          SELECT COUNT(*)
          FROM comments c
          WHERE c.post_id = ${posts.id}
        )
      `,

      savesCount: sql<number>`
        (
          SELECT COUNT(*)
          FROM saved_posts sp
          WHERE
            sp.post_id = ${posts.id}
            AND sp.deleted_at IS NULL
        )
      `,

      hasSaved: sql<boolean>`true`,

      hasLiked: sql<boolean>`
        EXISTS (
          SELECT 1
          FROM post_likes pl
          WHERE
            pl.post_id = ${posts.id}
            AND pl.user_id = ${userId}
        )
      `,
    })
    .from(savedPosts)
    .innerJoin(posts, eq(savedPosts.postId, posts.id))
    .innerJoin(users, eq(posts.userId, users.id))
    .innerJoin(courses, eq(posts.courseId, courses.id))
    .where(
      and(
        eq(savedPosts.userId, userId),
        isNull(savedPosts.deletedAt),
        isNull(posts.deletedAt),
      ),
    )
    .orderBy(desc(savedPosts.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
