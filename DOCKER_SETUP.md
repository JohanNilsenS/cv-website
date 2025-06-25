# Docker Setup Guide

This guide will help you run the full-stack portfolio application using Docker and Docker Compose.

## 🏗️ Architecture Overview

The Docker setup includes:
- **Frontend**: React/TypeScript app served by Nginx (Port 3000)
- **Backend**: Node.js/Express API with TypeScript (Port 3001)
- **Database**: PostgreSQL 15 (Port 5432)
- **Nginx Proxy**: Optional reverse proxy for production-like setup (Port 80)

## 📋 Prerequisites

- Docker Desktop or Docker Engine (20.0+)
- Docker Compose (2.0+)
- Git
- 4GB+ RAM recommended

### Installation Links
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd cv-website
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp docker.env.example .env

# Edit the .env file with your email credentials
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```env
# Email Configuration (required for contact form)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=johan.stjernquist@example.com
```

### 3. Run the Application

```bash
# Build and start all services
docker-compose up --build -d

# Or use the test script for comprehensive testing
chmod +x test-docker.sh
./test-docker.sh
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Database**: localhost:5432 (postgres/portfolio_password_2024)

## 🛠️ Available Commands

### Basic Operations

```bash
# Start services
docker-compose up -d

# Build and start services
docker-compose up --build -d

# Stop services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v --remove-orphans

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Service Management

```bash
# Restart a specific service
docker-compose restart backend

# Rebuild a specific service
docker-compose up --build backend

# Scale services (if needed)
docker-compose up --scale backend=2

# Execute commands in containers
docker-compose exec backend npm run db:migrate
docker-compose exec db psql -U postgres -d portfolio
```

### Development Commands

```bash
# Run database migrations
docker-compose exec backend npm run db:migrate

# Generate Prisma client
docker-compose exec backend npm run db:generate

# Open Prisma Studio
docker-compose exec backend npm run db:studio

# Create admin user
docker-compose exec backend node -e "
const bcrypt = require('bcryptjs');
console.log('Hashed password:', bcrypt.hashSync('your-password', 12));
"
```

## 🔧 Configuration Options

### Environment Variables

The application supports these environment variables:

#### Email Configuration
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=recipient@example.com
```

#### Database Configuration
```env
DATABASE_URL=postgresql://postgres:portfolio_password_2024@db:5432/portfolio
```

#### Security Configuration
```env
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

#### Frontend Configuration
```env
VITE_API_URL=http://localhost:3001
```

### Port Configuration

You can customize ports by modifying the `docker-compose.yml` file:

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Change frontend port to 8080
  
  backend:
    ports:
      - "8001:3001"  # Change backend port to 8001
  
  db:
    ports:
      - "5433:5432"  # Change database port to 5433
```

## 🐳 Docker Services Details

### Frontend Service
- **Base Image**: nginx:alpine
- **Build Context**: ./cv-app
- **Port**: 3000 → 80
- **Health Check**: curl -f http://localhost/health
- **Features**: 
  - Multi-stage build (Node.js build + Nginx serve)
  - Optimized production build
  - SPA routing support

### Backend Service
- **Base Image**: node:20-alpine
- **Build Context**: ./backend
- **Port**: 3001
- **Health Check**: HTTP GET /health
- **Features**:
  - TypeScript compilation
  - Prisma database client
  - Production optimizations
  - Non-root user security

### Database Service
- **Base Image**: postgres:15-alpine
- **Port**: 5432
- **Volume**: postgres_data
- **Health Check**: pg_isready
- **Features**:
  - Persistent data storage
  - Automatic database creation
  - Connection pooling ready

### Nginx Proxy (Optional)
- **Base Image**: nginx:alpine
- **Port**: 80, 443
- **Profile**: production
- **Features**:
  - Reverse proxy configuration
  - CORS handling
  - Security headers
  - Gzip compression

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Kill the process or change ports in docker-compose.yml
```

#### 2. Database Connection Issues
```bash
# Check database logs
docker-compose logs db

# Test database connection
docker-compose exec db pg_isready -U postgres -d portfolio

# Connect to database manually
docker-compose exec db psql -U postgres -d portfolio
```

#### 3. Backend Not Starting
```bash
# Check backend logs
docker-compose logs backend

# Check if database is ready
docker-compose exec backend npm run db:generate

# Run migrations manually
docker-compose exec backend npm run db:migrate
```

#### 4. Frontend Build Issues
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend only
docker-compose up --build frontend

# Check Nginx configuration
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf
```

#### 5. Email Not Working
```bash
# Check backend logs for email errors
docker-compose logs backend | grep -i email

# Test email configuration
docker-compose exec backend node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
transporter.verify().then(console.log).catch(console.error);
"
```

### Health Checks

All services have health checks configured:

```bash
# Check service health
docker-compose ps

# Manual health checks
curl http://localhost:3000/health  # Frontend
curl http://localhost:3001/health  # Backend
docker-compose exec db pg_isready -U postgres -d portfolio  # Database
```

### Log Analysis

```bash
# Follow all logs
docker-compose logs -f

# Filter logs by service
docker-compose logs -f backend | grep ERROR

# Show last 100 lines
docker-compose logs --tail=100

# Show logs with timestamps
docker-compose logs -t
```

## 🚀 Production Deployment

### With Nginx Proxy

```bash
# Start with nginx proxy
docker-compose --profile production up -d

# Access via nginx proxy
curl http://localhost/  # Frontend
curl http://localhost/api/health  # Backend via proxy
```

### Environment Security

For production deployment:

1. **Change default passwords**:
   ```env
   JWT_SECRET=generate-a-strong-secret-key
   # Use a password manager to generate secure passwords
   ```

2. **Use Docker secrets** (Docker Swarm):
   ```yaml
   secrets:
     jwt_secret:
       file: ./secrets/jwt_secret.txt
   ```

3. **Enable HTTPS** with Let's Encrypt:
   ```yaml
   services:
     nginx:
       volumes:
         - ./ssl:/etc/nginx/ssl
   ```

### Performance Optimization

```yaml
# Add resource limits
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

## 📊 Monitoring

### Service Status

```bash
# Check service status
docker-compose ps

# Check resource usage
docker stats

# Check disk usage
docker system df
```

### Database Monitoring

```bash
# Connect to database
docker-compose exec db psql -U postgres -d portfolio

# Check database size
docker-compose exec db psql -U postgres -d portfolio -c "
SELECT pg_size_pretty(pg_database_size('portfolio')) as size;
"

# Check table sizes
docker-compose exec db psql -U postgres -d portfolio -c "
SELECT schemaname,tablename,pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size 
FROM pg_tables WHERE schemaname='public';
"
```

## 🔄 Updates and Maintenance

### Updating the Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d

# Run any new migrations
docker-compose exec backend npm run db:migrate
```

### Database Backups

```bash
# Create backup
docker-compose exec db pg_dump -U postgres portfolio > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker-compose exec -T db psql -U postgres portfolio < backup_20240101_120000.sql
```

### Cleanup

```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Complete system cleanup
docker system prune -a --volumes
```

## 📝 Development Workflow

### Making Changes

1. **Frontend changes**:
   ```bash
   # Edit files in cv-app/
   # Rebuild frontend
   docker-compose up --build frontend
   ```

2. **Backend changes**:
   ```bash
   # Edit files in backend/
   # Rebuild backend
   docker-compose up --build backend
   ```

3. **Database schema changes**:
   ```bash
   # Edit backend/prisma/schema.prisma
   # Create migration
   docker-compose exec backend npx prisma migrate dev --name your_migration_name
   ```

### Testing

```bash
# Run the comprehensive test
./test-docker.sh

# Manual API testing
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'

# Test projects endpoint
curl http://localhost:3001/api/projects
```

## 🆘 Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Run the test script: `./test-docker.sh`
3. Check service logs: `docker-compose logs [service-name]`
4. Verify your `.env` configuration
5. Ensure Docker has enough resources (4GB+ RAM recommended)

For additional help, please check the main project README or create an issue in the repository. 