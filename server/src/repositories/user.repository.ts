import { eq } from "drizzle-orm";

import { db } from "../config/database";
import { users } from "../db/schema/user.schema";

export async function findUserById(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id));

  return user ?? null;
}

export async function getUsers() {
  return db.select().from(users);
}
