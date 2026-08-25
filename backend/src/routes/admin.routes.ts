import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';
import { 
  getCategories, createCategory, updateCategory, deleteCategory,
  getStreams, createStream, deleteStream,
  getContentItems,
  createContent,
  deleteContent,
} from '../controllers/admin.controller';

const router = Router();

// Protect all admin routes
router.use(authenticate, requireAdmin);

// Categories
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Streams
router.get('/streams', getStreams);
router.post('/streams', createStream);
router.delete('/streams/:id', deleteStream);

// Content
router.get('/content', getContentItems);
router.post('/content', createContent);
router.delete('/content/:id', deleteContent);

export default router;
