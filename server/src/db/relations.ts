import { relations } from "drizzle-orm";

import { users } from "./schema/user.schema";
import { courses } from "./schema/course.schema";
import { enrollments } from "./schema/enrollment.schema";
import { posts } from "./schema/post.schema";
import { savedPosts } from "./schema/saved-post.schema";
import { comments } from "./schema/comment.schema";
import { postLikes } from "./schema/post-like.schema";

export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  posts: many(posts),
  comments: many(comments),
  likes: many(postLikes),
  savedPosts: many(savedPosts),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  enrollments: many(enrollments),
  posts: many(posts),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),

  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  course: one(courses, {
    fields: [posts.courseId],
    references: [courses.id],
  }),

  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),

  likes: many(postLikes),

  comments: many(comments),

  savedPosts: many(savedPosts),
}));

export const savedPostsRelations = relations(savedPosts, ({ one }) => ({
  user: one(users, {
    fields: [savedPosts.userId],
    references: [users.id],
  }),

  post: one(posts, {
    fields: [savedPosts.postId],
    references: [posts.id],
  }),
}));

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  post: one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
  }),

  user: one(users, {
    fields: [postLikes.userId],
    references: [users.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),

  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));
