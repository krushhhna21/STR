import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../dev.json');

export const initDb = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], categories: [], streams: [] }, null, 2));
  }
};

export const getDb = () => {
  if (!fs.existsSync(dbPath)) {
    initDb();
  }
  const data = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(data);
  db.users = db.users || [];
  db.categories = db.categories || [];
  db.streams = db.streams || [];
  return db;
};

export const saveDb = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

