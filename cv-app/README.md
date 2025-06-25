# Johan Nilsen Stjernquist - Portfolio Website

A modern, responsive portfolio website showcasing my skills and experience in AI and Machine Learning. Built with React, TypeScript, and Vite for optimal performance and developer experience.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Components**: Skill bars, project filtering, contact form
- **Performance Optimized**: Built with Vite for fast loading and development
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Docker Ready**: Containerized for easy deployment

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, CSS3
- **Build Tool**: Vite
- **Styling**: Custom CSS with modern features (Grid, Flexbox, CSS Variables)
- **Deployment**: Docker, Nginx
- **Fonts**: Inter (Google Fonts)

## 📱 Sections

1. **Hero**: Introduction with call-to-action
2. **About**: Personal background and highlights
3. **Skills**: Technical skills with progress indicators
4. **Projects**: Portfolio projects with filtering
5. **Contact**: Contact form and information
6. **Footer**: Social links and additional info

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Build Docker image
npm run docker:build

# Run container
npm run docker:run

# Or use Docker Compose
npm run docker:compose:up
```

## 🌐 Deployment

This portfolio is configured for deployment with:

- **Dokploy**: Auto-deployment from Git repository
- **Docker**: Containerized with multi-stage build
- **Nginx**: Production web server

### Dokploy Configuration

The project includes a `dokploy.json` configuration file for seamless deployment:

- Automatic builds on push to main branch
- Health checks on `/health` endpoint
- Environment-specific configurations

## 📂 Project Structure

```
cv-app/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section
│   │   ├── About.tsx       # About section
│   │   ├── Skills.tsx      # Skills showcase
│   │   ├── Projects.tsx    # Project portfolio
│   │   ├── Contact.tsx     # Contact form
│   │   └── Footer.tsx      # Footer with links
│   ├── App.tsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── dokploy.json          # Deployment configuration
└── README.md             # Project documentation
```

## 🎨 Customization

### Colors

The design uses CSS custom properties for easy theming. Main colors are defined in `App.css`:

- Primary: Blue (#2563eb)
- Accent: Cyan (#06b6d4)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)

### Content

Update personal information in the respective component files:

- **Personal info**: `Hero.tsx`, `About.tsx`
- **Skills**: `Skills.tsx`
- **Projects**: `Projects.tsx`
- **Contact**: `Contact.tsx`, `Footer.tsx`

## 📧 Contact

- **Email**: johan.stjernquist@example.com
- **LinkedIn**: [linkedin.com/in/johan-stjernquist](https://linkedin.com/in/johan-stjernquist)
- **GitHub**: [github.com/johan-stjernquist](https://github.com/johan-stjernquist)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ by Johan Nilsen Stjernquist*
