# Portfolio Backend API

A full-stack backend system for Johan Nilsen Stjernquist's portfolio website with database integration, email services, and REST API for dynamic content management.

## Features

- 📝 **Contact Form Management**: Store and manage contact form submissions
- 📧 **Email Notifications**: Automatic email notifications and auto-replies
- 🗃️ **Dynamic Projects**: REST API for project management with CRUD operations
- 🔐 **Authentication**: JWT-based authentication for admin access
- 🛡️ **Security**: Rate limiting, CORS, input validation, and sanitization
- 🐳 **Docker Ready**: Containerized for easy deployment
- 📊 **Database**: PostgreSQL with Prisma ORM
- ⚡ **TypeScript**: Full type safety and modern development experience

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Email**: Nodemailer
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon, ts-node

## Prerequisites

- Node.js 20 or higher
- PostgreSQL database
- SMTP email service (Gmail, etc.)

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the environment example file and configure your settings:

```bash
cp .env.example .env
```

Configure your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=johan.stjernquist@example.com

# CORS
FRONTEND_URL=http://localhost:5173
PRODUCTION_URL=https://johancv.com
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

### 4. Create Admin User

After starting the server, create an admin user by making a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johan Nilsen Stjernquist",
    "email": "johan@example.com",
    "password": "your-secure-password"
  }'
```

### 5. Seed Initial Projects (Optional)

You can seed initial projects by making authenticated POST requests to `/api/projects` or use Prisma Studio.

## Development

### Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001` with hot reloading enabled.

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server
npm run db:generate # Generate Prisma client
npm run db:migrate  # Run database migrations
npm run db:deploy   # Deploy migrations (production)
npm run db:studio   # Open Prisma Studio
```

## API Documentation

### Base URL
- Development: `http://localhost:3001/api`
- Production: `https://api.johancv.com/api`

### Authentication

All admin endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

### Endpoints

#### Contact Management

**Submit Contact Form (Public)**
```http
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Get Contacts (Admin)**
```http
GET /api/contacts?page=1&limit=10
Authorization: Bearer <token>
```

**Mark Contact as Read (Admin)**
```http
PATCH /api/contacts/:id/read
Authorization: Bearer <token>
```

**Delete Contact (Admin)**
```http
DELETE /api/contacts/:id
Authorization: Bearer <token>
```

#### Project Management

**Get Projects (Public)**
```http
GET /api/projects?category=web&includeHidden=false
```

**Get Single Project (Public)**
```http
GET /api/projects/:id
```

**Create Project (Admin)**
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Project Title",
  "description": "Short description",
  "longDescription": "Detailed description...",
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "category": "web",
  "status": "completed",
  "githubUrl": "https://github.com/user/repo",
  "demoUrl": "https://example.com",
  "order": 1,
  "isVisible": true
}
```

**Update Project (Admin)**
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Delete Project (Admin)**
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

**Reorder Projects (Admin)**
```http
PATCH /api/projects/reorder
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectOrders": [
    { "id": "project-1", "order": 1 },
    { "id": "project-2", "order": 2 }
  ]
}
```

#### Authentication

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "johan@example.com",
  "password": "your-password"
}
```

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Johan Nilsen Stjernquist",
  "email": "johan@example.com",
  "password": "secure-password"
}
```

**Get Profile**
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Health Check

**Health Status**
```http
GET /health
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t portfolio-backend .
```

### Run with Docker

```bash
docker run -d \
  --name portfolio-backend \
  -p 3001:3001 \
  --env-file .env \
  portfolio-backend
```

### Docker Compose (Development)

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/portfolio
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the app password in your `.env` file

### Email Templates

The system sends two types of emails:
- **Contact Notification**: Sent to you when someone submits the contact form
- **Auto-Reply**: Sent to the person who submitted the form

Email templates are styled with inline CSS for better client compatibility.

## Database Schema

### Contact
- `id`: Unique identifier (cuid)
- `name`: Contact person's name
- `email`: Contact person's email
- `subject`: Message subject
- `message`: Message content
- `isRead`: Read status
- `createdAt`: Submission timestamp
- `updatedAt`: Last update timestamp

### Project
- `id`: Unique identifier (cuid)
- `title`: Project title
- `description`: Short description
- `longDescription`: Detailed description
- `technologies`: Array of technology strings
- `category`: Project category (web, backend, ai-ml, data, mobile)
- `status`: Project status (completed, in-progress, planned)
- `githubUrl`: GitHub repository URL (optional)
- `demoUrl`: Live demo URL (optional)
- `imageUrl`: Project image URL (optional)
- `order`: Display order
- `isVisible`: Visibility flag
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### User
- `id`: Unique identifier (cuid)
- `email`: User email (unique)
- `password`: Hashed password
- `name`: User's full name
- `role`: User role (admin)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

## Security

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for specific origins
- **Helmet**: Security headers
- **Input Validation**: All inputs validated and sanitized
- **Password Hashing**: bcryptjs with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **SQL Injection Protection**: Prisma ORM with prepared statements

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "error": "Error message",
  "data": null
}
```

## Monitoring & Health Checks

- Health check endpoint: `GET /health`
- Returns server status, uptime, and timestamp
- Docker health check configured
- Prisma connection monitoring

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please contact:
- Email: johan.stjernquist@example.com
- GitHub: [@johan-stjernquist](https://github.com/johan-stjernquist)

---

Built with ❤️ by Johan Nilsen Stjernquist 