import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
const pool = new Pool({ connectionString: url });

async function reset() {
  try {
    await pool.query('TRUNCATE TABLE "User", "ContentItem", "Stream", "Category" CASCADE;');
    console.log('Tables truncated successfully.');
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}
reset();
