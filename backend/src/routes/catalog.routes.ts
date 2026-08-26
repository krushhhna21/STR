import { Router } from 'express';
import { getPublicCategories } from '../controllers/admin.controller';

const router = Router();

router.get('/categories', getPublicCategories);

export default router;