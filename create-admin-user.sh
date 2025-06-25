#!/bin/bash

# Script to create the first admin user for the portfolio website
# Run this after your backend is deployed and running

echo "🔐 Creating Admin User for Portfolio Website"
echo "============================================="

# Check if API URL is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <API_URL>"
    echo "Example: $0 https://johancv.com"
    echo ""
    echo "Windows PowerShell alternative:"
    echo 'Invoke-RestMethod -Uri "https://johancv.com/api/auth/register" -Method POST -ContentType "application/json" -Body ''{"name":"Johan Stjernquist","email":"admin@johancv.com","password":"YourSecurePassword123!"}'''
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

# Create JSON payload with proper escaping
JSON_PAYLOAD=$(cat <<EOF
{
    "name": "$ADMIN_NAME",
    "email": "$ADMIN_EMAIL",
    "password": "$ADMIN_PASSWORD"
}
EOF
)

# Create admin user
RESPONSE=$(curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -w "\nHTTP_CODE:%{http_code}" \
  --data "$JSON_PAYLOAD")

# Extract HTTP code and response body
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE:/d')

# Check if request was successful
if [ "$HTTP_CODE" = "201" ] || echo "$RESPONSE_BODY" | grep -q '"success":true'; then
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
    echo ""
    echo "🔗 API test endpoints:"
    echo "   curl $API_URL/api/health"
    echo "   curl $API_URL/health"
    echo ""
else
    echo "❌ Failed to create admin user (HTTP: $HTTP_CODE)"
    echo "Response: $RESPONSE_BODY"
    echo ""
    echo "💡 Troubleshooting:"
    echo "   1. Check if backend is running: curl $API_URL/api/health"
    echo "   2. Verify environment variables are set in Dokploy"
    echo "   3. Check backend logs in Dokploy dashboard"
    echo "   4. Ensure database is connected and migrations are run"
    echo ""
    echo "🖥️  Windows PowerShell alternative:"
    echo '   $body = @{'
    echo '       name = "'"$ADMIN_NAME"'"'
    echo '       email = "'"$ADMIN_EMAIL"'"'
    echo '       password = "'"$ADMIN_PASSWORD"'"'
    echo '   } | ConvertTo-Json'
    echo '   Invoke-RestMethod -Uri "'"$API_URL"'/api/auth/register" -Method POST -ContentType "application/json" -Body $body'
fi 