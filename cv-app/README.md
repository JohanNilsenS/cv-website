# CV App

A React + TypeScript + Vite application with Docker support for easy deployment with Dokploy.

## Features

- ⚡️ Vite for fast development and building
- ⚛️ React 19 with TypeScript
- 🐳 Docker support with multi-stage builds
- 🏥 Health check endpoints
- 📦 Optimized for production deployment
- 🚀 Ready for Dokploy auto-deployment

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Deployment

### Building the Docker Image

```bash
# Build the image
npm run docker:build
# or manually
docker build -t cv-app .

# Run the container
npm run docker:run
# or manually  
docker run -p 3000:80 cv-app
```

### Using Docker Compose

```bash
# Start the application
npm run docker:compose:up

# Stop the application
npm run docker:compose:down
```

The application will be available at `http://localhost:3000`

### Health Check

The application includes a health check endpoint at `/health` that returns `healthy` when the service is running properly.

## Dokploy Deployment

This project is pre-configured for Dokploy auto-deployment with the following files:

- `Dockerfile` - Multi-stage Docker build configuration
- `dokploy.json` - Dokploy deployment configuration
- `docker-compose.yml` - Container orchestration setup

### Dokploy Setup Steps

1. **Connect Repository**: Link your Git repository to Dokploy
2. **Auto-Detection**: Dokploy will automatically detect the `Dockerfile` and `dokploy.json`
3. **Environment Variables**: Configure any needed environment variables in Dokploy dashboard
4. **Domain Setup**: Configure your domain/subdomain in Dokploy
5. **Deploy**: Dokploy will automatically build and deploy on git pushes

### Dokploy Configuration

The `dokploy.json` file contains:
- Container configuration
- Health check settings  
- Port mapping (internal port 80)
- Restart policies
- Environment variables

### Production Considerations

- The application runs on nginx in production for optimal performance
- Health checks are configured for container orchestration
- The build is optimized with multi-stage Docker builds
- Static assets are served efficiently by nginx

## Project Structure

```
cv-app/
├── src/                 # Source code
├── public/             # Public assets
├── dist/               # Built files (generated)
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
├── dokploy.json        # Dokploy configuration  
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose:up` - Start with Docker Compose
- `npm run docker:compose:down` - Stop Docker Compose

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Docker** - Containerization
- **Nginx** - Production web server
- **ESLint** - Code linting

## License

MIT
