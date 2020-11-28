import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/admin').get(protect, admin, getUsers);
router.route('/admin/:id').delete(protect, admin, deleteUser);
router
  .route('/admin/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
