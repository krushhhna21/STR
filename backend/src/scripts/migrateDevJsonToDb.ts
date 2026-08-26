import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const devJsonPath = path.resolve(__dirname, '../../dev.json');
const dbPath = path.resolve(__dirname, '../../content.db');

function safeNow() {
  return new Date().toISOString();
}

function ensureSchema(db: Database.Database) {
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT,
      meta TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS streams (
      id TEXT PRIMARY KEY,
      categoryId TEXT,
      name TEXT NOT NULL,
      slug TEXT,
      meta TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      streamId TEXT,
      name TEXT NOT NULL,
      year TEXT,
      meta TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      subjectId TEXT,
      title TEXT NOT NULL,
      ordinal INTEGER,
      meta TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS materials (
      id TEXT PRIMARY KEY,
      chapterId TEXT,
      subjectId TEXT,
      title TEXT NOT NULL,
      type TEXT,
      linkOrFile TEXT,
      meta TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);
}

function normalizeEntry<T extends Record<string, any>>(entry: T) {
  const now = safeNow();
  return {
    id: entry.id || entry._id || entry.uuid || `${Math.random().toString(36).slice(2, 9)}`,
    name: entry.name || entry.title || '',
    slug: entry.slug || undefined,
    meta: JSON.stringify(entry.meta || {}),
    createdAt: entry.createdAt || now,
    updatedAt: entry.updatedAt || now,
    raw: entry,
  } as any;
}

function insertIfArray<T>(db: Database.Database, table: string, rows: T[], mapper: (r: T) => Record<string, any>) {
  if (!Array.isArray(rows) || rows.length === 0) return 0;
  const keys = Object.keys(mapper(rows[0]));
  const cols = keys.join(', ');
  const params = keys.map((k) => `@${k}`).join(', ');
  const stmt = db.prepare(`INSERT OR REPLACE INTO ${table} (${cols}) VALUES (${params})`);

  const insert = db.transaction((items: T[]) => {
    for (const it of items) {
      stmt.run(mapper(it));
    }
  });

  insert(rows);
  return rows.length;
}

async function run() {
  if (!fs.existsSync(devJsonPath)) {
    console.log('No dev.json found at', devJsonPath);
    process.exit(0);
  }

  const raw = fs.readFileSync(devJsonPath, 'utf8');
  const dev = JSON.parse(raw);

  const db = new Database(dbPath);
  try {
    ensureSchema(db);

    const counts: Record<string, number> = {};

    counts.categories = insertIfArray(db, 'categories', dev.categories || [], (c: any) => ({
      id: c.id || c.uuid || `${Math.random().toString(36).slice(2, 9)}`,
      name: c.name || c.title || '',
      slug: c.slug || null,
      meta: JSON.stringify(c.meta || {}),
      createdAt: c.createdAt || safeNow(),
      updatedAt: c.updatedAt || safeNow(),
    }));

    counts.streams = insertIfArray(db, 'streams', dev.streams || [], (s: any) => ({
      id: s.id || s.uuid || `${Math.random().toString(36).slice(2, 9)}`,
      categoryId: s.categoryId || s.category || null,
      name: s.name || s.title || '',
      slug: s.slug || null,
      meta: JSON.stringify(s.meta || {}),
      createdAt: s.createdAt || safeNow(),
      updatedAt: s.updatedAt || safeNow(),
    }));

    counts.subjects = insertIfArray(db, 'subjects', dev.subjects || [], (s: any) => ({
      id: s.id || s.uuid || `${Math.random().toString(36).slice(2, 9)}`,
      streamId: s.streamId || s.stream || null,
      name: s.name || s.title || '',
      year: s.year || null,
      meta: JSON.stringify(s.meta || {}),
      createdAt: s.createdAt || safeNow(),
      updatedAt: s.updatedAt || safeNow(),
    }));

    counts.chapters = insertIfArray(db, 'chapters', dev.chapters || [], (c: any) => ({
      id: c.id || c.uuid || `${Math.random().toString(36).slice(2, 9)}`,
      subjectId: c.subjectId || c.subject || null,
      title: c.title || c.name || '',
      ordinal: typeof c.ordinal === 'number' ? c.ordinal : null,
      meta: JSON.stringify(c.meta || {}),
      createdAt: c.createdAt || safeNow(),
      updatedAt: c.updatedAt || safeNow(),
    }));

    counts.materials = insertIfArray(db, 'materials', dev.materials || [], (m: any) => ({
      id: m.id || m.uuid || `${Math.random().toString(36).slice(2, 9)}`,
      chapterId: m.chapterId || m.chapter || null,
      subjectId: m.subjectId || m.subject || null,
      title: m.title || m.name || '',
      type: m.type || null,
      linkOrFile: m.linkOrFile || m.link || null,
      meta: JSON.stringify(m.meta || {}),
      createdAt: m.createdAt || safeNow(),
      updatedAt: m.updatedAt || safeNow(),
    }));

    console.log('Migration complete. Inserted counts:', counts);
  } finally {
    db.close();
  }
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
