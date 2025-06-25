-- Initial database setup for Portfolio Backend
-- This script runs when the PostgreSQL container starts

-- Ensure the database exists
SELECT 'CREATE DATABASE portfolio' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'portfolio')\gexec

-- Connect to the portfolio database
\c portfolio;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE portfolio TO postgres; 