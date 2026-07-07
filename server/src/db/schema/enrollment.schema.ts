import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";

import { courses } from "./course.schema";
import { users } from "./user.schema";

export const enrollments = pgTable(
  "enrollments",
  {
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),

    courseId: integer("course_id")
      .references(() => courses.id, {
        onDelete: "cascade",
      })
      .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.courseId],
    }),
  }),
);
