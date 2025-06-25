#!/bin/bash

# Simple startup script for the portfolio Docker environment

echo "🚀 Starting Portfolio Docker Environment"
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp docker.env.example .env
    echo "⚠️  Please edit .env file with your email credentials if needed"
fi

# Start the services
echo "🔧 Starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to initialize..."
sleep 20

# Run migrations if needed
echo "🗄️  Setting up database..."
docker-compose exec -T backend npx prisma migrate deploy 2>/dev/null || \
docker-compose exec -T backend npx prisma migrate dev --name init --skip-seed

# Show status
echo ""
echo "✅ Services Status:"
docker-compose ps

echo ""
echo "🌐 Your application is ready!"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   Health Check: http://localhost:3001/health"
echo ""
echo "📝 To stop: docker-compose down"
echo "🗑️  To clean up: docker-compose down -v" 