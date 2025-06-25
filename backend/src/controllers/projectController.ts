import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { databaseService } from '../services/databaseService';
import { ApiResponse } from '../types';

export const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('longDescription')
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage('Long description must be between 50 and 2000 characters'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology must be specified'),
  body('technologies.*')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each technology must be between 1 and 50 characters'),
  body('category')
    .trim()
    .isIn(['web', 'backend', 'ai-ml', 'data', 'mobile'])
    .withMessage('Category must be one of: web, backend, ai-ml, data, mobile'),
  body('status')
    .isIn(['completed', 'in-progress', 'planned'])
    .withMessage('Status must be one of: completed, in-progress, planned'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('demoUrl')
    .optional()
    .isURL()
    .withMessage('Demo URL must be a valid URL'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  body('isVisible')
    .optional()
    .isBoolean()
    .withMessage('isVisible must be a boolean'),
];

export const getProjects = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const prisma = databaseService.getPrismaClient();
    const includeHidden = req.query.includeHidden === 'true';
    const category = req.query.category as string;

    const whereClause: any = {};
    
    if (!includeHidden) {
      whereClause.isVisible = true;
    }
    
    if (category && category !== 'all') {
      whereClause.category = category;
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        description: true,
        longDescription: true,
        technologies: true,
        category: true,
        status: true,
        githubUrl: true,
        demoUrl: true,
        imageUrl: true,
        order: true,
        isVisible: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
    });
  }
};

export const getProject = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = databaseService.getPrismaClient();

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Invalid input data'
      });
      return;
    }

    const prisma = databaseService.getPrismaClient();
    const project = await prisma.project.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
    });
  }
};

export const updateProject = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const prisma = databaseService.getPrismaClient();
    
    const project = await prisma.project.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = databaseService.getPrismaClient();
    
    await prisma.project.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

export const updateProjectOrder = async (
  req: Request<{}, ApiResponse, { projectOrders: { id: string; order: number; }[] }>,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const { projectOrders } = req.body;
    const prisma = databaseService.getPrismaClient();

    // Update all project orders in a transaction
    await prisma.$transaction(
      projectOrders.map(({ id, order }) =>
        prisma.project.update({
          where: { id },
          data: { order }
        })
      )
    );

    res.json({
      success: true,
      message: 'Project order updated successfully'
    });
  } catch (error) {
    console.error('Update project order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project order'
    });
  }
}; 