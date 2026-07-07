import "dotenv/config";

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = drizzle(pool);

async function main() {
  await migrate(db, {
    migrationsFolder: "./drizzle",
  });

  console.log("✅ Migration completed");

  await pool.end();
}

main().catch(console.error);
