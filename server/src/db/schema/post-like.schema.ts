import { pgTable, serial, integer, unique } from "drizzle-orm/pg-core";

import { users } from "./user.schema";
import { posts } from "./post.schema";

export const postLikes = pgTable(
  "post_likes",
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
  },
  (table) => ({
    uniqueLike: unique().on(table.postId, table.userId),
  }),
);
