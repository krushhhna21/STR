import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb, saveDb } from '../utils/db';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'study_buddy_super_secret_dev_key';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const normalizeUserForResponse = (user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  studentProfile: user.studentProfile || null,
});

export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const db = getDb();
    const user = db.users.find((entry: any) => entry.id === req.user.id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user: normalizeUserForResponse(user) });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStudentProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const { studentProfile } = req.body;

    if (!studentProfile || typeof studentProfile !== 'object') {
      res.status(400).json({ error: 'A valid studentProfile object is required' });
      return;
    }

    const db = getDb();
    const userIndex = db.users.findIndex((entry: any) => entry.id === req.user.id);

    if (userIndex === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    db.users[userIndex] = {
      ...db.users[userIndex],
      name: req.body.name || db.users[userIndex].name || req.user.name,
      studentProfile,
      updatedAt: new Date().toISOString(),
    };

    saveDb(db);

    res.status(200).json({
      message: 'Student profile updated successfully',
      user: normalizeUserForResponse(db.users[userIndex]),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required' });
      return;
    }

    const db = getDb();
    const existingUser = db.users.find((u: any) => u.email === email);
    if (existingUser) {
      res.status(400).json({ error: 'User already exists with this email' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();
    const user = { id, name, email, passwordHash, role: 'STUDENT', studentProfile: null, createdAt: new Date().toISOString() };
    db.users.push(user);
    saveDb(db);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: normalizeUserForResponse(user),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const db = getDb();
    const user = db.users.find((u: any) => u.email === email);

    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: normalizeUserForResponse(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      res.status(400).json({ error: 'Google access_token is required' });
      return;
    }

    const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!googleRes.ok) {
      res.status(400).json({ error: 'Invalid Google token' });
      return;
    }

    const payload = await googleRes.json();

    const email = payload.email;
    const name = payload.name || 'Google User';

    const db = getDb();
    let user = db.users.find((u: any) => u.email === email);

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const passwordHash = await bcrypt.hash(randomPassword, 10);
      const id = crypto.randomUUID();
      user = { id, name, email, passwordHash, role: 'STUDENT', studentProfile: null, createdAt: new Date().toISOString() };
      db.users.push(user);
      saveDb(db);
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Logged in successfully via Google',
      token,
      user: normalizeUserForResponse(user),
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Internal server error during Google Auth' });
  }
};
