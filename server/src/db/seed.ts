import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { users } from "./schema/user.schema";
import { courses } from "./schema/course.schema";
import { enrollments } from "./schema/enrollment.schema";
import { posts } from "./schema/post.schema";
import { savedPosts } from "./schema/saved-post.schema";

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
    console.log("🌱 Seeding database...");

    // Delete existing data (respect FK order)
    await db.delete(savedPosts);
    await db.delete(posts);
    await db.delete(enrollments);
    await db.delete(courses);
    await db.delete(users);

    console.log("🗑️ Existing data deleted");

    // Users
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

    // Courses
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

    // Enrollments
    await db.insert(enrollments).values([
      {
        userId: insertedUsers[0].id,
        courseId: insertedCourses[0].id,
      },
      {
        userId: insertedUsers[1].id,
        courseId: insertedCourses[1].id,
      },
      {
        userId: insertedUsers[2].id,
        courseId: insertedCourses[0].id,
      },
      {
        userId: insertedUsers[2].id,
        courseId: insertedCourses[1].id,
      },
    ]);

    // Posts
    await db.insert(posts).values([
      {
        courseId: insertedCourses[0].id,
        title: "Understanding React Hooks",
        body: "Learn how useState, useEffect and custom hooks work.",
      },
      {
        courseId: insertedCourses[0].id,
        title: "React Context API",
        body: "Share state across components without prop drilling.",
      },
      {
        courseId: insertedCourses[0].id,
        title: "React Query Basics",
        body: "Fetching and caching server state with TanStack Query.",
      },
      {
        courseId: insertedCourses[1].id,
        title: "Express Middleware",
        body: "Understanding middleware execution order in Express.",
      },
      {
        courseId: insertedCourses[1].id,
        title: "JWT Authentication",
        body: "Secure REST APIs using JSON Web Tokens.",
      },
      {
        courseId: insertedCourses[1].id,
        title: "Introduction to Drizzle ORM",
        body: "Getting started with Drizzle ORM and PostgreSQL.",
      },
    ]);

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed database");
    console.error(error);
  } finally {
    await pool.end();
  }
}

seed();
