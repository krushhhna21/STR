import { Router } from 'express';
import { register, login, googleLogin } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);

// Protected route example to verify token
router.get('/me', authenticate, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
