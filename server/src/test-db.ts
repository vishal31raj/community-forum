import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function test() {
  const client = await pool.connect();

  const res = await client.query("SELECT current_database(), current_user");

  client.release();
  await pool.end();
}

test();
