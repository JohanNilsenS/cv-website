import { Router } from 'express';
import {
  login,
  register,
  getProfile,
  loginValidation,
  registerValidation,
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

export default router; 