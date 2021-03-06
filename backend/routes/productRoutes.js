import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProductById,
  updateProduct,
  createProduct,
  createReview,
  getTopProducts,
} from '../controllers/productController.js';

import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProducts);
router.route('/admin').post(protect, admin, createProduct);
router.route('/:id/:user').get(getProductById);
router.route('/:id/reviews').post(protect, createReview);
router
  .route('/admin/:id')
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

export default router;
