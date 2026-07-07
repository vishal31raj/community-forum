import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["student", "moderator"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  role: userRoleEnum("role").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
