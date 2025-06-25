# Docker Setup Verification Guide

This guide explains how to verify and run your full-stack portfolio website using Docker.

## 🏗️ Architecture Overview

Your application consists of three main services:

1. **PostgreSQL Database** (`portfolio-db`) - Port 5432
2. **Backend API** (`portfolio-backend`) - Port 3001
3. **Frontend React App** (`portfolio-frontend`) - Port 3000

## 📋 Prerequisites

- Docker Desktop installed and running
- Docker Compose available
- At least 4GB of available RAM
- Ports 3000, 3001, and 5432 available

## 🚀 Quick Start

### 1. Verify Docker Installation
```bash
docker --version
docker-compose --version
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp docker.env.example .env

# Edit .env with your email credentials (optional for testing)
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# EMAIL_FROM=your-email@gmail.com
# EMAIL_TO=your-email@gmail.com
```

### 3. Run the Complete Test Suite
```bash
bash test-docker.sh
```

This script will:
- ✅ Build all Docker images
- ✅ Start all services with health checks
- ✅ Run database migrations
- ✅ Test all API endpoints
- ✅ Verify frontend accessibility
- ✅ Display service status and logs

### 4. Manual Startup (Alternative)
```bash
# Start all services
docker-compose up --build -d

# Run database migrations (first time only)
docker-compose exec backend npx prisma migrate dev --name init

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

## 🔍 Service Verification

### Database Service
```bash
# Check database health
docker-compose exec db pg_isready -U postgres -d portfolio

# Connect to database
docker-compose exec db psql -U postgres -d portfolio
```

### Backend API Service
```bash
# Health check
curl http://localhost:3001/health

# Test projects endpoint
curl http://localhost:3001/api/projects

# Test contact form
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### Frontend Service
```bash
# Health check
curl http://localhost:3000/health

# Access the application
open http://localhost:3000
```

## 🛠️ Common Issues & Solutions

### Backend Container Restarts
**Issue**: Prisma client not initialized
**Solution**: The Dockerfile has been updated to properly generate Prisma client in production

### Database Connection Errors
**Issue**: Tables don't exist
**Solution**: Run migrations:
```bash
docker-compose exec backend npx prisma migrate deploy
```

### Port Conflicts
**Issue**: Ports already in use
**Solution**: Stop conflicting services or modify ports in docker-compose.yml

### Build Failures
**Issue**: Docker build fails
**Solution**: Clean Docker cache:
```bash
docker system prune -a
docker-compose build --no-cache
```

## 📊 Service Health Monitoring

All services include health checks:

- **Database**: PostgreSQL connection test every 10s
- **Backend**: HTTP health endpoint test every 30s
- **Frontend**: Nginx health endpoint test every 30s

View health status:
```bash
docker-compose ps
```

## 🔧 Development Commands

### Rebuild specific service
```bash
docker-compose build backend
docker-compose up -d backend
```

### View service logs
```bash
docker-compose logs backend -f
docker-compose logs frontend -f
docker-compose logs db -f
```

### Execute commands in containers
```bash
# Backend shell
docker-compose exec backend sh

# Database shell
docker-compose exec db psql -U postgres -d portfolio

# Run Prisma commands
docker-compose exec backend npx prisma studio
docker-compose exec backend npx prisma migrate status
```

### Clean up
```bash
# Stop services
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v

# Complete cleanup
docker-compose down -v --remove-orphans
docker system prune -a
```

## 🌐 Production Deployment

For production deployment, consider:

1. **Environment Variables**: Set proper production values in `.env`
2. **SSL/TLS**: Configure HTTPS certificates
3. **Reverse Proxy**: Use the included Nginx configuration
4. **Database**: Use managed PostgreSQL service
5. **Monitoring**: Implement logging and monitoring solutions

### Enable Nginx Reverse Proxy
```bash
docker-compose --profile production up -d
```

This will start Nginx on ports 80/443 with SSL termination.

## 📝 File Structure

```
cv-website/
├── docker-compose.yml          # Main orchestration file
├── docker.env.example          # Environment template
├── test-docker.sh             # Automated test script
├── backend/
│   ├── Dockerfile             # Backend container definition
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── src/                   # Backend source code
├── cv-app/
│   ├── Dockerfile             # Frontend container definition
│   └── src/                   # Frontend source code
└── nginx/                     # Reverse proxy configuration
```

## ✅ Success Indicators

When everything is working correctly, you should see:

1. **All containers healthy**: `docker-compose ps` shows all services as "healthy"
2. **API endpoints responding**: All curl tests return expected responses
3. **Frontend accessible**: Website loads at http://localhost:3000
4. **Database connected**: Backend can query database successfully
5. **Contact form working**: Form submissions are processed and stored

## 🎯 Next Steps

After verification:

1. Customize the environment variables for your needs
2. Add your actual email credentials for contact form functionality
3. Deploy to your preferred hosting platform
4. Set up CI/CD pipelines for automated deployments
5. Configure monitoring and logging for production

---

**🎉 Your Docker setup is now verified and ready for development and deployment!** 