import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);

//To implement middleware to routes, simply add them as an argument. Protect here is a middleware
router.route('/profile').get(protect, getUserProfile);

export default router;
