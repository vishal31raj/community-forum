import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = drizzle(pool);

export async function connectDB() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.log("Database connected");
    client.release();
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}
