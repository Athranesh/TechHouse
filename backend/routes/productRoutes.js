import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProductById,
} from '../controllers/productController.js';

import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/admin/:id').delete(protect, admin, deleteProductById);

export default router;
