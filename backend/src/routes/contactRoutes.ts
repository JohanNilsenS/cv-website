import { Router } from 'express';
import {
  submitContact,
  getContacts,
  markContactAsRead,
  deleteContact,
  contactValidation,
} from '../controllers/contactController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public route for contact form submission
router.post('/', contactValidation, submitContact);

// Protected admin routes
router.get('/', authenticateToken, requireAdmin, getContacts);
router.patch('/:id/read', authenticateToken, requireAdmin, markContactAsRead);
router.delete('/:id', authenticateToken, requireAdmin, deleteContact);

export default router; 