import express from 'express';
import { getWoodCategories, createWoodCategory, updateWoodCategory, deleteWoodCategory } from '../controllers/categoryWoodController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getWoodCategories);
router.post('/', verifyToken, createWoodCategory);
router.put('/:id', verifyToken, updateWoodCategory);
router.delete('/:id', verifyToken, deleteWoodCategory);

export default router;
