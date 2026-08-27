import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { prisma } from '../utils/prisma';

const statusFor = (err: any) => err?.code === 'P2025' ? 404 : 500;
const messageFor = (err: any, fallback: string) => err?.code === 'P2025' ? fallback : err.message;

export const getCategories = async (_req: Request, res: Response) => {
  try { res.json(await prisma.category.findMany({ include: { streams: true }, orderBy: { name: 'asc' } })); }
  catch (err: any) { res.status(500).json({ error: err.message }); }
};

export const getPublicCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({ include: { streams: true }, orderBy: { name: 'asc' } });
    res.json(categories.map((category) => ({
      id: category.id, name: category.name, description: category.description || '', icon: category.icon || '',
      color: category.color || '', bg: category.bg || '',
      streams: category.streams.map((stream) => ({ id: stream.id, name: stream.name, icon: stream.icon || '', subjects: [] })),
    })));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, color, bg } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });
    const category = await prisma.category.create({
      data: { name, description: description || null, icon: icon || null, color: color || null, bg: bg || null,
        streams: { create: { id: randomUUID(), name: 'General Stream', icon: 'layers' } } },
      include: { streams: true },
    });
    res.status(201).json(category);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, color, bg } = req.body;
    res.json(await prisma.category.update({ where: { id: String(req.params.id) }, data: { name, description: description || null, icon: icon || null, color: color || null, bg: bg || null } }));
  } catch (err: any) { res.status(statusFor(err)).json({ error: messageFor(err, 'Not found') }); }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try { await prisma.category.delete({ where: { id: String(req.params.id) } }); res.json({ success: true }); }
  catch (err: any) { res.status(statusFor(err)).json({ error: messageFor(err, 'Not found') }); }
};

export const getStreams = async (_req: Request, res: Response) => {
  try { res.json(await prisma.stream.findMany({ orderBy: { name: 'asc' } })); }
  catch (err: any) { res.status(500).json({ error: err.message }); }
};

export const createStream = async (req: Request, res: Response) => {
  try {
    const { name, icon, categoryId } = req.body;
    if (!name || !categoryId) return res.status(400).json({ error: 'name and categoryId are required' });
    res.status(201).json(await prisma.stream.create({ data: { id: randomUUID(), name, icon: icon || null, categoryId } }));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
};

export const deleteStream = async (req: Request, res: Response) => {
  try { await prisma.stream.delete({ where: { id: String(req.params.id) } }); res.json({ success: true }); }
  catch (err: any) { res.status(statusFor(err)).json({ error: messageFor(err, 'Not found') }); }
};

export const getContentItems = async (req: Request, res: Response) => {
  try {
    const { category, stream, subject, type } = req.query;
    res.json(await prisma.contentItem.findMany({
      where: { category: typeof category === 'string' ? category : undefined, stream: typeof stream === 'string' ? stream : undefined, subject: typeof subject === 'string' ? subject : undefined, type: typeof type === 'string' ? type : undefined },
      orderBy: { createdAt: 'desc' },
    }));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    const { category, stream, year, subject, type, title, linkOrFile, meta } = req.body;
    if (!category || !stream || !year || !subject || !type || !title) return res.status(400).json({ error: 'category, stream, year, subject, type and title are required' });
    res.status(201).json(await prisma.contentItem.create({ data: { id: randomUUID(), category, stream, year, subject, type, title, linkOrFile: linkOrFile || '', meta: meta || 'Added by Admin' } }));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
};

export const deleteContent = async (req: Request, res: Response) => {
  try { await prisma.contentItem.delete({ where: { id: String(req.params.id) } }); res.json({ success: true }); }
  catch (err: any) { res.status(statusFor(err)).json({ error: messageFor(err, 'Content item not found') }); }
};
