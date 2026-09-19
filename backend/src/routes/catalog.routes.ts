import { Router } from 'express';
import { getPublicCategories, getPublicContent } from '../controllers/admin.controller';

const router = Router();

router.get('/categories', getPublicCategories);
router.get('/content', getPublicContent);

export default router;