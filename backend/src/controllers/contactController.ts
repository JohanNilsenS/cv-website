import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { databaseService } from '../services/databaseService';
import { emailService } from '../services/emailService';
import { ApiResponse, ContactSubmission } from '../types';

export const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

export const submitContact = async (
  req: Request<{}, ApiResponse, ContactSubmission>,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Invalid input data',
        error: 'Validation failed'
      });
      return;
    }

    const { name, email, subject, message } = req.body;
    const prisma = databaseService.getPrismaClient();

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        isRead: false
      }
    });

    // Send email notification (optional)
    try {
      // Only attempt email if SMTP is configured
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        console.log('Attempting to send email notifications...');
        await emailService.sendContactNotification({
          name,
          email,
          subject,
          message
        });

        // Send auto-reply
        await emailService.sendAutoReply({
          name,
          email,
          subject,
          message
        });
        console.log('Email notifications sent successfully');
      } else {
        console.log('SMTP not configured, skipping email notifications');
      }
    } catch (emailError) {
      console.error('Email sending failed (but continuing):', emailError);
      // Continue even if email fails - contact still saved to database
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact.id,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getContacts = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const prisma = databaseService.getPrismaClient();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          message: true,
          isRead: true,
          createdAt: true,
        },
      }),
      prisma.contact.count(),
    ]);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts',
    });
  }
};

export const markContactAsRead = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
) => {
  try {
    const { id } = req.params;
    const prisma = databaseService.getPrismaClient();

    const contact = await prisma.contact.update({
      where: { id },
      data: { isRead: true },
      select: {
        id: true,
        isRead: true,
      },
    });

    res.json({
      success: true,
      message: 'Contact marked as read',
      data: contact,
    });
  } catch (error) {
    console.error('Mark contact as read error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact',
    });
  }
};

export const deleteContact = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
) => {
  try {
    const { id } = req.params;
    const prisma = databaseService.getPrismaClient();

    await prisma.contact.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact',
    });
  }
}; 