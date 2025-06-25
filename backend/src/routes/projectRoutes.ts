import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  updateProjectOrder,
  projectValidation,
} from '../controllers/projectController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected admin routes
router.post('/', authenticateToken, requireAdmin, projectValidation, createProject);
router.put('/:id', authenticateToken, requireAdmin, projectValidation, updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);
router.patch('/reorder', authenticateToken, requireAdmin, updateProjectOrder);

export default router; 