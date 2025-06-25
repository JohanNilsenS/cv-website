#!/bin/bash

# Script to create the first admin user for the portfolio website
# Run this after your backend is deployed and running

echo "🔐 Creating Admin User for Portfolio Website"
echo "============================================="

# Check if API URL is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <API_URL>"
    echo "Example: $0 https://johancv.com"
    exit 1
fi

API_URL="$1"

echo "API URL: $API_URL"
echo ""

# Prompt for admin details
read -p "Enter admin name (default: Johan Stjernquist): " ADMIN_NAME
ADMIN_NAME=${ADMIN_NAME:-"Johan Stjernquist"}

read -p "Enter admin email (default: admin@johancv.com): " ADMIN_EMAIL  
ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@johancv.com"}

read -s -p "Enter admin password (min 6 characters): " ADMIN_PASSWORD
echo ""

if [ ${#ADMIN_PASSWORD} -lt 6 ]; then
    echo "❌ Password must be at least 6 characters long"
    exit 1
fi

echo ""
echo "Creating admin user..."

# Create admin user
RESPONSE=$(curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$ADMIN_NAME\",
    \"email\": \"$ADMIN_EMAIL\", 
    \"password\": \"$ADMIN_PASSWORD\"
  }")

# Check if request was successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Admin user created successfully!"
    echo ""
    echo "🎉 You can now access the admin interface at:"
    echo "   $API_URL/admin"
    echo ""
    echo "📧 Login credentials:"
    echo "   Email: $ADMIN_EMAIL"
    echo "   Password: [the password you entered]"
    echo ""
    echo "🔧 Admin features available:"
    echo "   • View and manage contact form submissions"
    echo "   • Show/hide projects on your portfolio"
    echo "   • Monitor website activity"
else
    echo "❌ Failed to create admin user"
    echo "Response: $RESPONSE"
    echo ""
    echo "💡 Possible issues:"
    echo "   • Backend is not running or accessible"
    echo "   • Database connection issues"
    echo "   • User with this email already exists"
fi 