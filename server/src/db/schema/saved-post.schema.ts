import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { posts } from "./post.schema";
import { users } from "./user.schema";

export const savedPosts = pgTable(
  "saved_posts",
  {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),

    postId: integer("post_id")
      .references(() => posts.id, {
        onDelete: "cascade",
      })
      .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    uniqueSave: unique().on(table.userId, table.postId),

    userIdx: index("saved_posts_user_idx").on(table.userId),

    postIdx: index("saved_posts_post_idx").on(table.postId),

    lookupIdx: index("saved_posts_lookup_idx").on(table.userId, table.postId),
  }),
);
