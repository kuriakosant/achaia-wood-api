import express from 'express';
import { getAllWoodProducts, getWoodProductById, createWoodProduct, updateWoodProduct, deleteWoodProduct } from '../controllers/productWoodController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllWoodProducts);
router.get('/:id', getWoodProductById);
router.post('/', verifyToken, createWoodProduct);
router.put('/:id', verifyToken, updateWoodProduct);
router.delete('/:id', verifyToken, deleteWoodProduct);

export default router;
