import express from 'express';
import { getAllGalleryProducts, getGalleryProductById, createGalleryProduct, updateGalleryProduct, deleteGalleryProduct } from '../controllers/productGalleryController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllGalleryProducts);
router.get('/:id', getGalleryProductById);
router.post('/', verifyToken, createGalleryProduct);
router.put('/:id', verifyToken, updateGalleryProduct);
router.delete('/:id', verifyToken, deleteGalleryProduct);

export default router;
