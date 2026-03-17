import { Router } from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController';
import { verifyToken as adminAuth } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAllCategories);

// Protected routes
router.post('/', adminAuth, createCategory);
router.put('/:id', adminAuth, updateCategory);
router.delete('/:id', adminAuth, deleteCategory);

export default router;
