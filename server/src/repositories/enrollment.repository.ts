import { and, eq } from "drizzle-orm";

import { db } from "../config/database";
import { enrollments } from "../db/schema/enrollment.schema";

export async function isUserEnrolled(userId: number, courseId: number) {
  const [enrollment] = await db
    .select()
    .from(enrollments)
    .where(
      and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)),
    );

  return !!enrollment;
}
