import { Router } from 'express';
import { register, login, googleLogin, getMe, updateStudentProfile, toggleRole } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateStudentProfile);
router.post('/toggle-role', authenticate, toggleRole);

export default router;
