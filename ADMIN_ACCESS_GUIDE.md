# 🔐 Admin Interface Access Guide

## Overview

Your portfolio website now includes a complete admin interface that allows you to:
- View and manage contact form submissions
- Show/hide projects on your portfolio
- Monitor website activity
- Manage content dynamically

## 🚀 Quick Access

### Method 1: Browser Interface (Recommended)

1. **Navigate to Admin Page**: 
   ```
   https://johancv.com/admin
   ```

2. **Create Your First Admin User** (one-time setup):
   ```bash
   # Make the script executable
   chmod +x create-admin-user.sh
   
   # Run the script
   ./create-admin-user.sh https://johancv.com
   ```

3. **Login**: Use the credentials you created to access the dashboard

### Method 2: API Access (Advanced)

If you prefer direct API access or need to troubleshoot:

```bash
# Create admin user
curl -X POST https://johancv.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johan Stjernquist",
    "email": "admin@johancv.com",
    "password": "your-secure-password"
  }'

# Login to get JWT token
curl -X POST https://johancv.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@johancv.com",
    "password": "your-secure-password"
  }'
```

## 🎛️ Admin Dashboard Features

### Contact Management
- **View Submissions**: See all contact form submissions with timestamps
- **Mark as Read**: Track which messages you've reviewed
- **Delete Contacts**: Remove spam or processed messages
- **Email Details**: Full contact information and message content

### Project Management
- **Show/Hide Projects**: Control which projects appear on your portfolio
- **Project Status**: View project completion status
- **Technology Tags**: See all technologies used in each project
- **External Links**: Access GitHub and demo links directly

### User Management
- **Profile View**: See your admin profile information
- **Secure Logout**: Clear authentication tokens safely

## 🔧 Admin Routes Available

### Authentication Endpoints
- `POST /api/auth/register` - Create admin user
- `POST /api/auth/login` - Login to get JWT token
- `GET /api/auth/profile` - Get user profile

### Contact Management
- `GET /api/contacts` - View all contact submissions
- `PATCH /api/contacts/:id/read` - Mark contact as read
- `DELETE /api/contacts/:id` - Delete contact

### Project Management
- `GET /api/projects` - View all projects (public endpoint)
- `POST /api/projects` - Create new project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)
- `PATCH /api/projects/reorder` - Reorder projects (admin only)

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Admin-only routes protected
- **Password Hashing**: Bcrypt with salt rounds for security
- **Token Expiration**: 7-day token expiry for security
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: Protection against brute force attacks

## 📱 Mobile Responsive

The admin interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔐 Default Credentials

After running the setup script, you can use:
- **Email**: `admin@johancv.com` (or your custom email)
- **Password**: The secure password you set during setup

## 🚨 Troubleshooting

### Can't Access Admin Page
1. Ensure your backend is running on Dokploy
2. Check that the frontend build includes the admin routes
3. Verify the URL: `https://johancv.com/admin`

### Login Issues
1. **Wrong Credentials**: Double-check email and password
2. **Token Expired**: Try logging out and back in
3. **Network Issues**: Check browser developer tools for errors

### API Errors
1. **500 Error**: Check backend logs in Dokploy
2. **401 Unauthorized**: Token may be expired, re-login
3. **403 Forbidden**: Ensure user has admin role

### Database Issues
1. Check Dokploy database service is running
2. Verify environment variables are set correctly
3. Ensure database migrations have run

## 🔄 Regular Maintenance

### Weekly Tasks
- Review and respond to contact submissions
- Update project visibility as needed
- Check for any error messages

### Monthly Tasks
- Review admin access logs
- Update projects with new work
- Clean up old contact submissions

## 🎯 Quick Commands

```bash
# Create admin user (one-time)
./create-admin-user.sh https://johancv.com

# Test API connection
curl https://johancv.com/api/health

# Check backend status
curl https://johancv.com/api/projects

# Login via API
curl -X POST https://johancv.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@johancv.com","password":"your-password"}'
```

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review Dokploy deployment logs
3. Verify environment variables are set
4. Test API endpoints directly

---

**🎉 You're all set!** Access your admin interface at `https://johancv.com/admin` and start managing your portfolio content. 