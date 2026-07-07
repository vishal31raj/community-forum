import { eq } from "drizzle-orm";

import { db } from "../config/database";
import { courses } from "../db/schema/course.schema";

export async function findCourseById(id: number) {
  const [course] = await db.select().from(courses).where(eq(courses.id, id));

  return course ?? null;
}

export async function getCourses() {
  return db.select().from(courses);
}
