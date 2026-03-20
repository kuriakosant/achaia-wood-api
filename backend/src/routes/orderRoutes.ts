import express from 'express';
import { createOrder, getAllOrders, updateOrder, deleteOrder } from '../controllers/orderController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Public route to place an order
router.post('/', createOrder);

// Admin routes to manage orders
router.get('/', verifyToken, getAllOrders);
router.put('/:id', verifyToken, updateOrder);
router.delete('/:id', verifyToken, deleteOrder);

export default router;
