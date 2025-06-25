#!/bin/bash

# Test script for Docker Compose setup
# This script will build and test the full-stack application

set -e

echo "🚀 Testing Portfolio Full-Stack Docker Setup"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker and Docker Compose are installed
print_status "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose are installed ✓"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from docker.env.example..."
    cp docker.env.example .env
    print_warning "Please edit .env file with your actual email credentials before running in production"
fi

# Clean up any existing containers
print_status "Cleaning up existing containers..."
docker-compose down -v --remove-orphans 2>/dev/null || true

# Build and start services
print_status "Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
print_status "Waiting for services to be ready..."
sleep 30

# Test database connection
print_status "Testing database connection..."
if docker-compose exec -T db pg_isready -U postgres -d portfolio; then
    print_status "Database is ready ✓"
else
    print_error "Database is not ready ✗"
    docker-compose logs db
    exit 1
fi

# Test backend health
print_status "Testing backend health..."
max_attempts=10
attempt=1
while [ $attempt -le $max_attempts ]; do
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        print_status "Backend is healthy ✓"
        break
    else
        print_warning "Backend not ready yet (attempt $attempt/$max_attempts)..."
        sleep 5
        attempt=$((attempt + 1))
    fi
done

if [ $attempt -gt $max_attempts ]; then
    print_error "Backend failed to start ✗"
    docker-compose logs backend
    exit 1
fi

# Run database migrations
print_status "Running database migrations..."
if docker-compose exec -T backend npx prisma migrate dev --name init --skip-seed 2>/dev/null || docker-compose exec -T backend npx prisma migrate deploy; then
    print_status "Database migrations completed ✓"
else
    print_error "Database migrations failed ✗"
    exit 1
fi

# Test frontend
print_status "Testing frontend..."
max_attempts=10
attempt=1
while [ $attempt -le $max_attempts ]; do
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        print_status "Frontend is healthy ✓"
        break
    else
        print_warning "Frontend not ready yet (attempt $attempt/$max_attempts)..."
        sleep 5
        attempt=$((attempt + 1))
    fi
done

if [ $attempt -gt $max_attempts ]; then
    print_error "Frontend failed to start ✗"
    docker-compose logs frontend
    exit 1
fi

# Test API endpoints
print_status "Testing API endpoints..."

# Test projects endpoint
if curl -f http://localhost:3001/api/projects > /dev/null 2>&1; then
    print_status "Projects API endpoint is working ✓"
else
    print_error "Projects API endpoint failed ✗"
    exit 1
fi

# Test contact form endpoint (POST)
print_status "Testing contact form submission..."
contact_response=$(curl -s -X POST http://localhost:3001/api/contacts \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User",
        "email": "test@example.com",
        "subject": "Docker Test",
        "message": "This is a test message from the Docker setup verification."
    }')

if echo "$contact_response" | grep -q '"success":true'; then
    print_status "Contact form submission is working ✓"
else
    print_error "Contact form submission failed ✗"
    echo "Response: $contact_response"
fi

# Show service status
print_status "Service Status:"
docker-compose ps

# Show logs summary
print_status "Recent logs summary:"
echo "--- Backend Logs ---"
docker-compose logs --tail=10 backend
echo "--- Frontend Logs ---"
docker-compose logs --tail=10 frontend
echo "--- Database Logs ---"
docker-compose logs --tail=10 db

print_status "✅ All tests passed! Your Docker setup is working correctly."
print_status ""
print_status "🌐 Access your application:"
print_status "   Frontend: http://localhost:3000"
print_status "   Backend API: http://localhost:3001"
print_status "   API Health: http://localhost:3001/health"
print_status "   Database: localhost:5432 (postgres/portfolio_password_2024)"
print_status ""
print_status "📝 To stop the services: docker-compose down"
print_status "🗑️  To clean up everything: docker-compose down -v --remove-orphans" 