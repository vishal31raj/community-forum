import { eq, sql } from "drizzle-orm";

import { db } from "../config/database";
import { courses } from "../db/schema/course.schema";

export async function findCourseById(id: number) {
  const [course] = await db.select().from(courses).where(eq(courses.id, id));

  return course ?? null;
}

export async function getCourses(userId: number, userRole: string) {
  if (userRole === "student") {
    return db
      .select()
      .from(courses)
      .where(
        sql`
          EXISTS (
            SELECT 1
            FROM enrollments e
            WHERE
              e.course_id = ${courses.id}
              AND e.user_id = ${userId}
          )
        `,
      );
  }

  return db.select().from(courses);
}
