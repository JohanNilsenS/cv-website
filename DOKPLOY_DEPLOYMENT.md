# Dokploy Deployment Guide

This guide explains how to deploy your full-stack portfolio website to production using Dokploy.

## 🏗️ Architecture Overview

Your application will be deployed as a multi-service Docker Compose application with:

- **PostgreSQL Database** - Persistent data storage
- **Backend API** - Node.js/Express with TypeScript
- **Frontend** - React/TypeScript served by Nginx
- **Traefik** - Automatic SSL and reverse proxy (handled by Dokploy)

## 📋 Prerequisites

- Dokploy server set up and running
- Domain name pointing to your server (johancv.com)
- Git repository accessible to Dokploy
- Email credentials for contact form functionality

## 🚀 Deployment Steps

### 1. Prepare Your Repository

Ensure your repository has these files at the root:
- `dokploy.json` - Dokploy configuration
- `docker-compose.prod.yml` - Production compose file (optional)
- `docker-compose.yml` - Main compose file

### 2. Configure Environment Variables in Dokploy

Set these environment variables in your Dokploy project:

#### Required Variables:
```env
# Database
DB_PASSWORD=your-secure-database-password

# JWT Security
JWT_SECRET=your-super-secret-jwt-key-256-bits-minimum

# Email Configuration
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com

# Optional: Custom domain
DOMAIN=johancv.com
```

#### Gmail App Password Setup:
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this password (not your regular Gmail password) for `SMTP_PASS`

### 3. Deploy via Dokploy

#### Option A: Using the Web Interface
1. Create a new application in Dokploy
2. Select "Docker Compose" as the application type
3. Connect your Git repository
4. Set the compose file path to `docker-compose.yml`
5. Add all environment variables listed above
6. Deploy

#### Option B: Using dokploy.json Configuration
1. Push the `dokploy.json` file to your repository
2. Dokploy will automatically detect and use this configuration
3. Set environment variables in the Dokploy interface
4. Deploy

### 4. Post-Deployment Setup

After successful deployment, run database migrations:

```bash
# Via Dokploy terminal or SSH to your server
docker-compose exec backend npx prisma migrate deploy
```

Or the migration will run automatically via the post-deploy hook in `dokploy.json`.

## 🔧 Configuration Details

### Domain and SSL

Dokploy automatically handles:
- SSL certificate generation via Let's Encrypt
- Traefik reverse proxy configuration
- HTTP to HTTPS redirects

Your services will be accessible at:
- **Frontend**: https://johancv.com
- **Backend API**: https://johancv.com/api/*

### Health Checks

All services include health checks:
- **Database**: PostgreSQL connection test
- **Backend**: HTTP health endpoint (`/health`)
- **Frontend**: Nginx health endpoint

### Persistent Storage

The following data is persisted:
- **Database**: PostgreSQL data in `postgres_data` volume
- **Uploads**: Backend file uploads in `backend_uploads` volume

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Connection Errors
```bash
# Check database logs
docker-compose logs db

# Verify database is running
docker-compose exec db pg_isready -U postgres -d portfolio
```

#### 2. Backend Not Starting
```bash
# Check backend logs
docker-compose logs backend

# Run migrations manually
docker-compose exec backend npx prisma migrate deploy
```

#### 3. Frontend Build Errors
```bash
# Check build logs in Dokploy interface
# Verify VITE_API_URL is set correctly in build args
```

#### 4. SSL Certificate Issues
- Ensure domain DNS points to your server
- Check Dokploy Traefik configuration
- Verify domain in `dokploy.json` matches your actual domain

### Monitoring

#### Service Status
```bash
# Check all services
docker-compose ps

# Check specific service health
curl https://johancv.com/health
curl https://johancv.com/api/health
```

#### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

## 🔒 Security Considerations

### Environment Variables
- Use strong, unique passwords for `DB_PASSWORD` and `JWT_SECRET`
- Keep email credentials secure
- Rotate secrets regularly

### Database Security
- Database is not exposed to the internet (internal network only)
- Use strong database password
- Regular backups recommended

### API Security
- JWT tokens for authentication
- Rate limiting configured
- CORS properly configured
- Helmet security headers enabled

## 🚀 Performance Optimization

### Production Settings
- Frontend built with production optimizations
- Backend runs with NODE_ENV=production
- Database connection pooling
- Health checks for monitoring

### Scaling
If you need to scale:
```yaml
# In docker-compose.yml, add:
deploy:
  replicas: 2  # Scale backend to 2 instances
```

## 📊 Monitoring and Maintenance

### Database Backups
```bash
# Create backup
docker-compose exec db pg_dump -U postgres portfolio > backup.sql

# Restore backup
docker-compose exec -T db psql -U postgres portfolio < backup.sql
```

### Updates
1. Push code changes to your repository
2. Redeploy via Dokploy interface
3. Run any new migrations if needed

### Health Monitoring
Set up monitoring for:
- Application uptime
- Database connectivity
- SSL certificate expiration
- Disk space usage

## 🎯 Success Checklist

After deployment, verify:
- [ ] Frontend loads at https://johancv.com
- [ ] Backend API responds at https://johancv.com/api/health
- [ ] Contact form submissions work
- [ ] SSL certificate is valid
- [ ] All services show as healthy
- [ ] Database migrations completed
- [ ] Email notifications work (if configured)

## 📞 Support

If you encounter issues:
1. Check Dokploy logs and monitoring
2. Review service logs via `docker-compose logs`
3. Verify environment variables are set correctly
4. Check domain DNS configuration
5. Ensure all required ports are open

---

**Your full-stack portfolio is now ready for production deployment with Dokploy!** 🚀 