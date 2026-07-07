import { desc, and, count, eq, isNull, sql } from "drizzle-orm";

import { db } from "../config/database";
import { posts } from "../db/schema/post.schema";
import { savedPosts } from "../db/schema/saved-post.schema";

export async function findPostById(id: number) {
  const [post] = await db.select().from(posts).where(eq(posts.id, id));

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
    .where(eq(posts.courseId, courseId))
    .orderBy(desc(posts.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function countPosts(courseId: number) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(posts)
    .where(eq(posts.courseId, courseId));

  return result.count;
}

export async function getCourseFeed(
  courseId: number,
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

      savesCount: count(savedPosts.id),

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
    })
    .from(posts)
    .leftJoin(
      savedPosts,
      and(eq(savedPosts.postId, posts.id), isNull(savedPosts.deletedAt)),
    )
    .where(eq(posts.courseId, courseId))
    .groupBy(posts.id)
    .orderBy(desc(posts.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
