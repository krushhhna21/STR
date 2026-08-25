import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.resolve(__dirname, '../../content.db');

let contentDb: Database.Database | null = null;

const getContentDb = (): Database.Database => {
  if (!contentDb) {
    contentDb = new Database(dbPath);
    contentDb.pragma('journal_mode = WAL');
  }

  return contentDb;
};

export const initContentDb = () => {
  const db = getContentDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS content_items (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      stream TEXT NOT NULL,
      year TEXT NOT NULL,
      subject TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      linkOrFile TEXT NOT NULL,
      meta TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_content_category ON content_items(category);
    CREATE INDEX IF NOT EXISTS idx_content_stream ON content_items(stream);
    CREATE INDEX IF NOT EXISTS idx_content_subject ON content_items(subject);
    CREATE INDEX IF NOT EXISTS idx_content_type ON content_items(type);
  `);
};

export interface ContentItemRecord {
  id: string;
  category: string;
  stream: string;
  year: string;
  subject: string;
  type: 'book' | 'video' | 'resource';
  title: string;
  linkOrFile: string;
  meta: string;
  createdAt: string;
  updatedAt: string;
}

export const listContentItems = (filters: {
  category?: string;
  stream?: string;
  subject?: string;
  type?: string;
}): ContentItemRecord[] => {
  const db = getContentDb();

  const where: string[] = [];
  const params: Record<string, string> = {};

  if (filters.category) {
    where.push('category = @category');
    params.category = filters.category;
  }

  if (filters.stream) {
    where.push('stream = @stream');
    params.stream = filters.stream;
  }

  if (filters.subject) {
    where.push('subject = @subject');
    params.subject = filters.subject;
  }

  if (filters.type) {
    where.push('type = @type');
    params.type = filters.type;
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
  const stmt = db.prepare(`SELECT * FROM content_items ${whereSql} ORDER BY datetime(createdAt) DESC`);

  return stmt.all(params) as ContentItemRecord[];
};

export const createContentItem = (item: Omit<ContentItemRecord, 'createdAt' | 'updatedAt'>): ContentItemRecord => {
  const db = getContentDb();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO content_items (id, category, stream, year, subject, type, title, linkOrFile, meta, createdAt, updatedAt)
     VALUES (@id, @category, @stream, @year, @subject, @type, @title, @linkOrFile, @meta, @createdAt, @updatedAt)`
  ).run({
    ...item,
    createdAt: now,
    updatedAt: now,
  });

  return {
    ...item,
    createdAt: now,
    updatedAt: now,
  };
};

export const deleteContentItemById = (id: string): boolean => {
  const db = getContentDb();
  const result = db.prepare('DELETE FROM content_items WHERE id = ?').run(id);
  return result.changes > 0;
};
