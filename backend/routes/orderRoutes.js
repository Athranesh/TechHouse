import express from 'express';
import {
  saveOrder,
  getOrderById,
  updateOrderToPaid,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, saveOrder);
router.route('/order/:id').get(protect, getOrderById);
router.route('/order/:id/pay').put(protect, updateOrderToPaid);
router.route('/admin').get(protect, admin, getOrders);

export default router;
