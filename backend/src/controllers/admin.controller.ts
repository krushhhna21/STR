import { Request, Response } from 'express';
import { getDb, saveDb } from '../utils/db';
import { randomUUID } from 'crypto';
import {
  createContentItem,
  deleteContentItemById,
  listContentItems,
} from '../utils/contentDb';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    res.json(db.categories || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, color, bg } = req.body;
    const db = getDb();
    if (!db.categories) db.categories = [];
    
    const category = { id: randomUUID(), name, description, icon, color, bg, createdAt: new Date().toISOString() };
    db.categories.push(category);
    saveDb(db);
    
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, bg } = req.body;
    const db = getDb();
    
    const index = db.categories.findIndex((c: any) => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    
    db.categories[index] = { ...db.categories[index], name, description, icon, color, bg, updatedAt: new Date().toISOString() };
    saveDb(db);
    
    res.json(db.categories[index]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDb();
    db.categories = db.categories.filter((c: any) => c.id !== id);
    saveDb(db);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getStreams = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    res.json(db.streams || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createStream = async (req: Request, res: Response) => {
  try {
    const { name, icon, categoryId } = req.body;
    const db = getDb();
    if (!db.streams) db.streams = [];
    
    const stream = { id: randomUUID(), name, icon, categoryId, createdAt: new Date().toISOString() };
    db.streams.push(stream);
    saveDb(db);
    
    res.json(stream);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStream = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDb();
    db.streams = db.streams.filter((s: any) => s.id !== id);
    saveDb(db);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getContentItems = async (req: Request, res: Response) => {
  try {
    const { category, stream, subject, type } = req.query;
    const items = listContentItems({
      category: typeof category === 'string' ? category : undefined,
      stream: typeof stream === 'string' ? stream : undefined,
      subject: typeof subject === 'string' ? subject : undefined,
      type: typeof type === 'string' ? type : undefined,
    });

    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    const { category, stream, year, subject, type, title, linkOrFile, meta } = req.body;

    if (!category || !stream || !year || !subject || !type || !title) {
      res.status(400).json({ error: 'category, stream, year, subject, type and title are required' });
      return;
    }

    const newItem = createContentItem({
      id: randomUUID(),
      category,
      stream,
      year,
      subject,
      type,
      title,
      linkOrFile: linkOrFile || '',
      meta: meta || 'Added by Admin',
    });

    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || '');
    if (!id) {
      res.status(400).json({ error: 'Content item id is required' });
      return;
    }
    const deleted = deleteContentItemById(id);
    if (!deleted) {
      res.status(404).json({ error: 'Content item not found' });
      return;
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
