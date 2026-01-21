import dotenv from "dotenv";
dotenv.config({ path: "../03_postgresql/.env" });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is required");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
