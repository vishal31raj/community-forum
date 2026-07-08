import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { users } from "./schema/user.schema";
import { courses } from "./schema/course.schema";
import { enrollments } from "./schema/enrollment.schema";
import { posts } from "./schema/post.schema";
import { savedPosts } from "./schema/saved-post.schema";
import { postLikes } from "./schema/post-like.schema";
import { comments } from "./schema/comment.schema";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = drizzle(pool);

async function seed() {
  try {
    console.log("Seeding database...");

    // Delete order (child -> parent)

    await db.delete(comments);

    await db.delete(postLikes);

    await db.delete(savedPosts);

    await db.delete(posts);

    await db.delete(enrollments);

    await db.delete(courses);

    await db.delete(users);

    console.log("Existing data removed");

    // USERS

    const insertedUsers = await db
      .insert(users)
      .values([
        {
          name: "Alice",
          role: "student",
        },

        {
          name: "Bob",
          role: "student",
        },

        {
          name: "Charlie",
          role: "student",
        },

        {
          name: "Admin",
          role: "moderator",
        },
      ])
      .returning();

    const alice = insertedUsers[0];
    const bob = insertedUsers[1];
    const charlie = insertedUsers[2];

    // COURSES

    const insertedCourses = await db
      .insert(courses)
      .values([
        {
          title: "React Fundamentals",
        },

        {
          title: "Node.js Backend",
        },
      ])
      .returning();

    const reactCourse = insertedCourses[0];
    const nodeCourse = insertedCourses[1];

    // ENROLLMENTS

    await db.insert(enrollments).values([
      {
        userId: alice.id,
        courseId: reactCourse.id,
      },

      {
        userId: bob.id,
        courseId: nodeCourse.id,
      },

      {
        userId: charlie.id,
        courseId: reactCourse.id,
      },

      {
        userId: charlie.id,
        courseId: nodeCourse.id,
      },
    ]);

    // POSTS

    const insertedPosts = await db
      .insert(posts)
      .values([
        {
          userId: alice.id,

          courseId: reactCourse.id,

          title: "Understanding React Hooks",

          body: "Learn how useState, useEffect and custom hooks work.",

          views: 20,
        },

        {
          userId: bob.id,

          courseId: reactCourse.id,

          title: "React Context API",

          body: "Share state without prop drilling.",

          views: 10,
        },

        {
          userId: charlie.id,

          courseId: nodeCourse.id,

          title: "Express Middleware",

          body: "Understanding middleware execution order.",

          views: 15,
        },

        {
          userId: bob.id,

          courseId: nodeCourse.id,

          title: "JWT Authentication",

          body: "Secure REST APIs using JSON Web Tokens.",

          views: 30,
        },
      ])
      .returning();

    const post1 = insertedPosts[0];
    const post2 = insertedPosts[1];
    const post3 = insertedPosts[2];

    // LIKES

    await db.insert(postLikes).values([
      {
        postId: post1.id,
        userId: bob.id,
      },

      {
        postId: post1.id,
        userId: charlie.id,
      },

      {
        postId: post2.id,
        userId: alice.id,
      },
    ]);

    // COMMENTS

    await db.insert(comments).values([
      {
        postId: post1.id,
        userId: bob.id,
        body: "Great explanation!",
      },

      {
        postId: post1.id,
        userId: charlie.id,
        body: "This helped me understand hooks.",
      },

      {
        postId: post3.id,
        userId: alice.id,
        body: "Middleware order was confusing before.",
      },
    ]);

    // SAVED POSTS

    await db.insert(savedPosts).values([
      {
        postId: post1.id,
        userId: bob.id,
      },

      {
        postId: post3.id,
        userId: alice.id,
      },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Seed failed", error);

    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
