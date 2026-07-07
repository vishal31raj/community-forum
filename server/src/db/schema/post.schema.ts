import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { courses } from "./course.schema";

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),

    courseId: integer("course_id")
      .references(() => courses.id, {
        onDelete: "cascade",
      })
      .notNull(),

    title: varchar("title", {
      length: 255,
    }).notNull(),

    body: text("body").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    courseIdx: index("posts_course_idx").on(table.courseId),

    createdIdx: index("posts_created_idx").on(table.createdAt),
  }),
);
