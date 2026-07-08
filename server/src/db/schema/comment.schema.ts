import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { posts } from "./post.schema";
import { users } from "./user.schema";

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),

    postId: integer("post_id")
      .references(() => posts.id, {
        onDelete: "cascade",
      })
      .notNull(),

    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),

    body: text("body").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    postIdx: index("comments_post_idx").on(table.postId),
    userIdx: index("comments_user_idx").on(table.userId),
    createdIdx: index("comments_created_idx").on(table.createdAt),
  }),
);
