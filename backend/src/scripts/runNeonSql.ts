import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  try {
    const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
    if (!url) throw new Error('No DATABASE_URL found');
    
    console.log('Connecting to Neon via WebSocket...');
    const pool = new Pool({ connectionString: url });
    
    const schemaPath = path.resolve(__dirname, '../../schema.sql');
    let sqlScript = fs.readFileSync(schemaPath, 'utf16le');
    if (sqlScript.charCodeAt(0) === 0xFEFF) {
      sqlScript = sqlScript.slice(1);
    }
    
    console.log('Executing schema.sql over WebSocket...');
    await pool.query(sqlScript);
    
    console.log('Successfully pushed schema to Neon over WebSocket!');
    await pool.end();
  } catch (err) {
    console.error('Error executing SQL:', err);
  }
};

run();
