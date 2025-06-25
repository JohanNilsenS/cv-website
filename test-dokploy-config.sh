#!/bin/bash

# Test script to validate Dokploy deployment configuration
# Run this before deploying to production

set -e

echo "🔍 Testing Dokploy Deployment Configuration"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check required files exist
echo "📁 Checking required files..."

if [ -f "dokploy.json" ]; then
    print_status "dokploy.json exists"
else
    print_error "dokploy.json not found"
    exit 1
fi

if [ -f "docker-compose.yml" ]; then
    print_status "docker-compose.yml exists"
else
    print_error "docker-compose.yml not found"
    exit 1
fi

if [ -f "backend/Dockerfile" ]; then
    print_status "backend/Dockerfile exists"
else
    print_error "backend/Dockerfile not found"
    exit 1
fi

if [ -f "cv-app/Dockerfile" ]; then
    print_status "cv-app/Dockerfile exists"
else
    print_error "cv-app/Dockerfile not found"
    exit 1
fi

if [ -f "backend/prisma/schema.prisma" ]; then
    print_status "Prisma schema exists"
else
    print_error "Prisma schema not found"
    exit 1
fi

# Validate dokploy.json syntax
echo ""
echo "🔧 Validating dokploy.json syntax..."
if python3 -m json.tool dokploy.json > /dev/null 2>&1; then
    print_status "dokploy.json is valid JSON"
else
    print_error "dokploy.json has invalid JSON syntax"
    exit 1
fi

# Check docker-compose.yml syntax
echo ""
echo "🐳 Validating docker-compose.yml..."
if command -v docker-compose &> /dev/null; then
    if docker-compose config > /dev/null 2>&1; then
        print_status "docker-compose.yml is valid"
    else
        print_error "docker-compose.yml has syntax errors"
        exit 1
    fi
else
    print_warning "docker-compose not available, skipping syntax check"
fi

# Check for required environment variables in dokploy.json
echo ""
echo "🔐 Checking environment variable configuration..."

required_vars=("DB_PASSWORD" "JWT_SECRET" "SMTP_USER" "SMTP_PASS" "EMAIL_FROM" "EMAIL_TO")
for var in "${required_vars[@]}"; do
    if grep -q "$var" dokploy.json; then
        print_status "Environment variable $var is configured"
    else
        print_error "Environment variable $var is missing from dokploy.json"
        exit 1
    fi
done

# Check if domain is configured
if grep -q "johancv.com" dokploy.json; then
    print_status "Domain is configured"
else
    print_warning "Domain might need to be updated in dokploy.json"
fi

# Test Docker builds locally (optional)
echo ""
echo "🏗️  Testing Docker builds (this may take a few minutes)..."

# Test backend build
if docker build -t test-backend ./backend > /dev/null 2>&1; then
    print_status "Backend Docker build successful"
    docker rmi test-backend > /dev/null 2>&1
else
    print_error "Backend Docker build failed"
    exit 1
fi

# Test frontend build
if docker build -t test-frontend ./cv-app > /dev/null 2>&1; then
    print_status "Frontend Docker build successful"
    docker rmi test-frontend > /dev/null 2>&1
else
    print_error "Frontend Docker build failed"
    exit 1
fi

# Check for common production issues
echo ""
echo "⚠️  Production readiness checks..."

# Check if .env files are in .gitignore
if [ -f ".gitignore" ] && grep -q "\.env" .gitignore; then
    print_status ".env files are properly ignored"
else
    print_warning ".env files should be added to .gitignore"
fi

# Check for hardcoded secrets
if grep -r "password" --include="*.json" --include="*.yml" --include="*.yaml" . | grep -v "DB_PASSWORD" | grep -v "SMTP_PASS" > /dev/null; then
    print_warning "Potential hardcoded passwords found - review configuration files"
fi

# Check for development URLs in production config
if grep -q "localhost" dokploy.json; then
    print_warning "localhost URLs found in dokploy.json - verify production URLs"
fi

echo ""
echo "🎯 Deployment Checklist:"
echo "========================"
echo "Before deploying to Dokploy, ensure:"
echo "  [ ] Domain DNS points to your Dokploy server"
echo "  [ ] Environment variables are set in Dokploy interface:"
echo "      - DB_PASSWORD (strong password)"
echo "      - JWT_SECRET (at least 32 characters)"
echo "      - SMTP_USER (your Gmail address)"
echo "      - SMTP_PASS (Gmail app password)"
echo "      - EMAIL_FROM (your email)"
echo "      - EMAIL_TO (recipient email)"
echo "  [ ] Gmail 2FA is enabled and app password is generated"
echo "  [ ] Repository is accessible to Dokploy"
echo "  [ ] All code is committed and pushed to repository"

echo ""
print_status "✅ Configuration validation completed successfully!"
print_status "Your application is ready for Dokploy deployment."

echo ""
echo "🚀 Next steps:"
echo "1. Push this configuration to your repository"
echo "2. Set up environment variables in Dokploy"
echo "3. Deploy via Dokploy interface"
echo "4. Run database migrations after deployment"
echo ""
echo "📖 See DOKPLOY_DEPLOYMENT.md for detailed deployment instructions" 