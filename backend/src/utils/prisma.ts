import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
const pool = new Pool({ connectionString: url });

const randomUUID = () => crypto.randomUUID();

// Minimal wrapper matching Prisma's API for the controllers
export const prisma = {
  $disconnect: async () => await pool.end(),
  user: {
    findUnique: async ({ where }: any) => {
      const res = await pool.query('SELECT * FROM "User" WHERE email = $1 OR id = $2', [where.email, where.id]);
      return res.rows[0] || null;
    },
    create: async ({ data }: any) => {
      const id = data.id || randomUUID();
      const res = await pool.query(
        'INSERT INTO "User" (id, name, email, "passwordHash", role, "studentProfile", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *',
        [id, data.name, data.email, data.passwordHash, data.role || 'STUDENT', data.studentProfile ? JSON.stringify(data.studentProfile) : null]
      );
      return res.rows[0];
    },
    update: async ({ where, data }: any) => {
      const updates = [];
      const values = [];
      let i = 1;
      for (const [key, value] of Object.entries(data)) {
        if (key !== 'id') {
          updates.push(`"${key}" = $${i}`);
          values.push(value && typeof value === 'object' ? JSON.stringify(value) : value);
          i++;
        }
      }
      if (updates.length === 0) return (await pool.query('SELECT * FROM "User" WHERE id = $1', [where.id])).rows[0];
      values.push(where.id);
      const res = await pool.query(
        `UPDATE "User" SET ${updates.join(', ')}, "updatedAt" = NOW() WHERE id = $${i} RETURNING *`,
        values
      );
      return res.rows[0];
    },
    upsert: async ({ where, update, create }: any) => {
      const existing = await prisma.user.findUnique({ where });
      if (existing) return await prisma.user.update({ where: { id: existing.id }, data: update });
      return await prisma.user.create({ data: create });
    }
  },
  category: {
    findMany: async ({ include, orderBy }: any = {}) => {
      const res = await pool.query('SELECT * FROM "Category" ORDER BY name ASC');
      const categories = res.rows;
      if (include?.streams) {
        const streamsRes = await pool.query('SELECT * FROM "Stream"');
        const streams = streamsRes.rows;
        for (const cat of categories) {
          cat.streams = streams.filter(s => s.categoryId === cat.id);
        }
      }
      return categories;
    },
    create: async ({ data, include }: any) => {
      const id = data.id || randomUUID();
      await pool.query(
        'INSERT INTO "Category" (id, name, description, icon, color, bg, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
        [id, data.name, data.description || null, data.icon || null, data.color || null, data.bg || null]
      );
      if (data.streams?.create) {
        await prisma.stream.create({ data: { ...data.streams.create, categoryId: id } });
      }
      return (await prisma.category.findMany({ include: { streams: true } })).find((c: any) => c.id === id);
    },
    update: async ({ where, data }: any) => {
      await pool.query(
        'UPDATE "Category" SET name=$1, description=$2, icon=$3, color=$4, bg=$5, "updatedAt"=NOW() WHERE id=$6',
        [data.name, data.description || null, data.icon || null, data.color || null, data.bg || null, where.id]
      );
      return { id: where.id, ...data };
    },
    delete: async ({ where }: any) => {
      await pool.query('DELETE FROM "Category" WHERE id = $1', [where.id]);
    }
  },
  stream: {
    findMany: async ({ orderBy }: any = {}) => {
      const res = await pool.query('SELECT * FROM "Stream" ORDER BY name ASC');
      return res.rows;
    },
    create: async ({ data }: any) => {
      const id = data.id || randomUUID();
      await pool.query(
        'INSERT INTO "Stream" (id, name, icon, "categoryId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())',
        [id, data.name, data.icon || null, data.categoryId]
      );
      return { ...data, id };
    },
    delete: async ({ where }: any) => {
      await pool.query('DELETE FROM "Stream" WHERE id = $1', [where.id]);
    }
  },
  contentItem: {
    findMany: async ({ where, orderBy }: any = {}) => {
      let query = 'SELECT * FROM "ContentItem" WHERE 1=1';
      const values: any[] = [];
      if (where) {
        for (const [key, val] of Object.entries(where)) {
          if (val !== undefined) {
            values.push(val);
            query += ` AND "${key}" = $${values.length}`;
          }
        }
      }
      query += ' ORDER BY "createdAt" DESC';
      const res = await pool.query(query, values);
      return res.rows;
    },
    create: async ({ data }: any) => {
      const id = data.id || randomUUID();
      await pool.query(
        'INSERT INTO "ContentItem" (id, category, stream, year, subject, type, title, "linkOrFile", meta, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())',
        [id, data.category, data.stream, data.year, data.subject, data.type, data.title, data.linkOrFile, data.meta]
      );
      return { ...data, id };
    },
    delete: async ({ where }: any) => {
      await pool.query('DELETE FROM "ContentItem" WHERE id = $1', [where.id]);
    }
  }
};