import nodemailer from 'nodemailer';
import { ContactSubmission } from '../types';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactNotification(contact: ContactSubmission): Promise<void> {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #06b6d4; color: white; border-radius: 8px; text-align: center;">
          <p style="margin: 0;">Reply to: <a href="mailto:${contact.email}" style="color: white; text-decoration: underline;">${contact.email}</a></p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          This email was sent from your portfolio website contact form.
          <br>
          Timestamp: ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${contact.subject}`,
      html: emailHtml,
      replyTo: contact.email,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Contact notification email sent successfully');
    } catch (error) {
      console.error('Failed to send contact notification email:', error);
      throw new Error('Failed to send email notification');
    }
  }

  async sendAutoReply(contact: ContactSubmission): Promise<void> {
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          Thank you for contacting me!
        </h2>
        
        <p>Hi ${contact.name},</p>
        
        <p>Thank you for reaching out through my portfolio website. I've received your message about "${contact.subject}" and will get back to you as soon as possible.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Your Message Summary</h3>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p>I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly at johan.stjernquist@example.com.</p>
        
        <p>Best regards,<br>Johan Nilsen Stjernquist</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          This is an automated response from johancv.com
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: contact.email,
      subject: 'Thank you for your message - Johan Nilsen Stjernquist',
      html: autoReplyHtml,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Auto-reply email sent successfully');
    } catch (error) {
      console.error('Failed to send auto-reply email:', error);
      // Don't throw here as auto-reply is optional
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service connection verified');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService(); 