import express from 'express';
import { getGalleryCategories, createGalleryCategory, updateGalleryCategory, deleteGalleryCategory } from '../controllers/categoryGalleryController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getGalleryCategories);
router.post('/', verifyToken, createGalleryCategory);
router.put('/:id', verifyToken, updateGalleryCategory);
router.delete('/:id', verifyToken, deleteGalleryCategory);

export default router;
