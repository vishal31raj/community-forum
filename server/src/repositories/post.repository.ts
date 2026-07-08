import { desc, and, count, eq, isNull, sql } from "drizzle-orm";

import { db } from "../config/database";

import { posts } from "../db/schema/post.schema";
import { savedPosts } from "../db/schema/saved-post.schema";
import { postLikes } from "../db/schema/post-like.schema";
import { comments } from "../db/schema/comment.schema";
import { users } from "../db/schema/user.schema";
import { courses } from "../db/schema/course.schema";
import { enrollments } from "../db/schema/enrollment.schema";

export async function createPost(data: {
  userId: number;
  courseId: number;
  title: string;
  body: string;
}) {
  const [post] = await db
    .insert(posts)
    .values({
      userId: data.userId,
      courseId: data.courseId,
      title: data.title,
      body: data.body,
    })
    .returning();

  return post;
}

export async function findPostById(id: number) {
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, id), isNull(posts.deletedAt)));

  return post ?? null;
}

export async function getPostsByCourse(
  courseId: number,
  page: number,
  pageSize: number,
) {
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.courseId, courseId), isNull(posts.deletedAt)))
    .orderBy(desc(posts.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function countFeedPosts(userId: number) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(posts)
    .innerJoin(
      enrollments,
      and(
        eq(enrollments.courseId, posts.courseId),
        eq(enrollments.userId, userId),
      ),
    )
    .where(isNull(posts.deletedAt));

  return result.count;
}

export async function getFeed(
  userId: number,
  userRole: string,
  page: number,
  pageSize: number,
) {
  let query = db
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

      hasSaved: sql<boolean>`
        EXISTS (
          SELECT 1
          FROM saved_posts sp
          WHERE
            sp.post_id = ${posts.id}
            AND sp.user_id = ${userId}
            AND sp.deleted_at IS NULL
        )
      `,

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
    .from(posts)
    .innerJoin(users, eq(users.id, posts.userId))
    .innerJoin(courses, eq(courses.id, posts.courseId));

  if (userRole === "student") {
    query = query.innerJoin(
      enrollments,
      and(
        eq(enrollments.courseId, posts.courseId),
        eq(enrollments.userId, userId),
      ),
    );
  }

  return query
    .where(isNull(posts.deletedAt))
    .orderBy(desc(posts.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function deletePost(postId: number, userId: number) {
  const [post] = await db
    .update(posts)

    .set({
      deletedAt: new Date(),
    })

    .where(
      and(
        eq(posts.id, postId),
        eq(posts.userId, userId),
        isNull(posts.deletedAt),
      ),
    )

    .returning();

  return post ?? null;
}

export async function getPostById(postId: number, userId: number) {
  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      body: posts.body,
      createdAt: posts.createdAt,

      course: {
        id: courses.id,
        title: courses.title,
      },

      author: {
        id: users.id,
        name: users.name,
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

      hasSaved: sql<boolean>`
        EXISTS (
          SELECT 1
          FROM saved_posts sp
          WHERE
            sp.post_id = ${posts.id}
            AND sp.user_id = ${userId}
            AND sp.deleted_at IS NULL
        )
      `,

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
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .innerJoin(courses, eq(posts.courseId, courses.id))
    .where(and(eq(posts.id, postId), isNull(posts.deletedAt)));

  return post ?? null;
}
