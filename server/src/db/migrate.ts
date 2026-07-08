import "dotenv/config";

import path from "node:path";
import { existsSync } from "node:fs";

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const migrationsFolder = path.resolve("./drizzle");

if (!existsSync(migrationsFolder)) {
  throw new Error(`Migration folder not found: ${migrationsFolder}`);
}

const pool = new Pool({
  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,
});

const db = drizzle(pool);

async function main() {
  try {
    await migrate(db, {
      migrationsFolder,
    });

    console.log("✅ Migration completed");
  } catch (error) {
    console.error("❌ Migration failed");

    console.error(error);

    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
