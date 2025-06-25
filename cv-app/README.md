# Johan Nilsen Stjernquist - Portfolio Website

A modern, full-stack portfolio website showcasing AI and Machine Learning expertise with dynamic backend integration.

## 🌟 Live Website

Visit the live website: **[johancv.com](https://johancv.com)**

## 🏗️ Architecture

This is a full-stack application consisting of:

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds  
- **Styling**: Custom CSS with modern design system
- **Deployment**: Docker + Nginx, auto-deployed with Dokploy

### Backend API (Node.js + Express)
- **Runtime**: Node.js 20 with TypeScript
- **Framework**: Express.js with comprehensive middleware
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth for admin features
- **Email**: Automated notifications via Nodemailer
- **Security**: Rate limiting, CORS, input validation

## ✨ Features

### Frontend Features
- 🎨 **Modern Design**: Clean, responsive design with smooth animations
- 📱 **Mobile First**: Optimized for all devices (mobile, tablet, desktop)
- ⚡ **Fast Performance**: Optimized builds with lazy loading and efficient code splitting
- 🎯 **Interactive Elements**: Smooth scrolling, animated skill bars, project filtering
- 📊 **Dynamic Content**: Projects and contact forms powered by backend API

### Backend Features
- 📝 **Contact Management**: Store and manage contact form submissions in database
- 📧 **Email System**: Automatic email notifications and professional auto-replies
- 🗃️ **Project Management**: RESTful API for dynamic project content with full CRUD operations
- 🔐 **Admin Authentication**: Secure JWT-based authentication for content management
- 🛡️ **Security**: Comprehensive security with rate limiting, validation, and sanitization
- 📊 **Database**: Robust PostgreSQL database with Prisma ORM

### Portfolio Sections
- **Hero Section**: Professional introduction with animated elements
- **About**: Personal background, journey, and key statistics
- **Skills**: Technical expertise with animated progress indicators
  - AI & Machine Learning (Python, TensorFlow, PyTorch, etc.)
  - Data Science & Analytics
  - Web Development (React, Node.js, TypeScript)
  - Development Tools & Methodologies
- **Projects**: Dynamic project showcase with filtering and detailed modals
- **Contact**: Integrated contact form with backend processing and email notifications

## 🚀 Quick Start

### Frontend Development

```bash
# Navigate to frontend
cd cv-app

# Install dependencies
npm install

# Create environment file (optional - has fallbacks)
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Backend Development

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database URL, SMTP settings, etc.

# Setup database
npm run db:generate
npm run db:migrate

# Start development server
npm run dev
```

API available at `http://localhost:3001`

## 🐳 Docker Deployment

### Frontend Docker

```bash
cd cv-app
docker build -t cv-website .
docker run -p 3000:80 cv-website
```

### Backend Docker

```bash
cd backend
docker build -t portfolio-backend .
docker run -p 3001:3001 --env-file .env portfolio-backend
```

### Full Stack with Docker Compose

```yaml
version: '3.8'
services:
  frontend:
    build: ./cv-app
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/portfolio
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📋 API Integration

The frontend integrates with the backend API for dynamic functionality:

### Contact Form
- Submits to `/api/contacts` endpoint
- Automatic email notifications
- Form validation and error handling
- Success/error status feedback

### Dynamic Projects
- Fetches projects from `/api/projects` endpoint
- Fallback to static data if API unavailable
- Loading states and error handling
- Real-time project management (admin only)

### Environment Configuration

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3001
```

**Backend (.env)**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"
PORT=3001
JWT_SECRET=your-jwt-secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=johan.stjernquist@example.com
```

## 🛠️ Development Scripts

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Backend Commands
```bash
npm run dev          # Start with hot reload
npm run build        # Build TypeScript
npm start           # Start production server
npm run db:generate # Generate Prisma client
npm run db:migrate  # Run database migrations
npm run db:studio   # Open Prisma Studio
```

### Docker Commands
```bash
npm run docker:build     # Build Docker image
npm run docker:run       # Run Docker container
npm run docker:compose:up   # Start with docker-compose
npm run docker:compose:down # Stop docker-compose
```

## 🏢 Deployment

### Dokploy Auto-Deployment

The application is configured for automatic deployment using Dokploy:

1. **Frontend**: Deployed to `johancv.com` with Docker + Nginx
2. **Backend**: API deployed with environment variable configuration
3. **Database**: PostgreSQL with automated migrations
4. **Monitoring**: Health checks and deployment status tracking

### Deployment Configuration

- **dokploy.json**: Deployment configuration
- **Docker health checks**: Application monitoring
- **Environment management**: Secure configuration handling
- **Automated migrations**: Database schema updates

## 📊 Tech Stack Details

### Frontend Stack
- **React 18**: Latest React with concurrent features
- **TypeScript**: Full type safety and developer experience
- **Vite**: Ultra-fast build tool and dev server
- **CSS3**: Modern CSS with custom properties and animations
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox

### Backend Stack
- **Node.js 20**: Latest LTS with native TypeScript support
- **Express.js**: Fast, minimalist web framework
- **Prisma**: Type-safe database client and migrations
- **PostgreSQL**: Robust relational database
- **JWT**: Secure authentication and authorization
- **Nodemailer**: Professional email handling
- **TypeScript**: End-to-end type safety

### DevOps & Tools
- **Docker**: Containerization for consistent deployment
- **Dokploy**: Automated CI/CD pipeline
- **GitHub**: Version control and collaboration
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## 🌟 Highlights

### Professional Focus
- **AI & Machine Learning Expertise**: Recent graduate with hands-on experience
- **Full-Stack Development**: Modern web technologies and best practices
- **Data Science**: Analytics, visualization, and insights
- **Remote Work Ready**: Available for global opportunities

### Technical Excellence
- **Modern Architecture**: Scalable, maintainable, and secure
- **Performance Optimized**: Fast loading, efficient rendering
- **SEO Friendly**: Proper meta tags, semantic HTML, accessibility
- **Production Ready**: Comprehensive error handling, monitoring, logging

### Contact & Opportunities
- **Open to Opportunities**: Full-time positions, freelance projects, collaborations
- **Location**: Gothenburg, Sweden + Remote work
- **Contact**: Via website form, LinkedIn, or GitHub
- **Response Time**: Typically within 24-48 hours

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Mobile Optimized**: Perfect responsive design
- **Accessibility**: WCAG compliance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Johan Nilsen Stjernquist**
- Website: [johancv.com](https://johancv.com)
- Email: johanstjernquist1@gmail.com
- LinkedIn: [Johan Nilsen Stjernquist](https://www.linkedin.com/in/johan-nilsen-stjernquist-692743208/)
- GitHub: [@JohanNilsenS](https://github.com/JohanNilsenS/)

---

Built with ❤️ using React, TypeScript, Node.js, and modern web technologies
