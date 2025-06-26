import React, { useState } from 'react'
import './Projects.css'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  order: number
  isVisible: boolean
  createdAt: string
  updatedAt: string
}

// Static project data
const staticProjects: Project[] = [
  {
    id: '1',
    title: 'CV Portfolio Website',
    description: 'Modern, responsive portfolio website built with React and TypeScript',
    longDescription: 'A comprehensive portfolio website showcasing my skills, projects, and experience. Built with modern web technologies and deployed using Docker and Dokploy for seamless CI/CD. Features responsive design, smooth animations, and optimized performance.',
    technologies: ['React', 'TypeScript', 'CSS3', 'Docker', 'Dokploy', 'Nginx'],
    category: 'web',
    status: 'in-progress',
    githubUrl: 'https://github.com/johan-stjernquist/cv-website',
    demoUrl: 'https://johancv.com',
    order: 1,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Portfolio Backend API',
    description: 'Full-stack backend system with database integration and email services',
    longDescription: 'A comprehensive backend system that powers the portfolio website with features including contact form submissions stored in database, email notifications, and a REST API for dynamic project management. Built with Node.js, Express, and PostgreSQL with proper authentication and validation.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Nodemailer', 'JWT', 'Docker'],
    category: 'backend',
    status: 'in-progress',
    githubUrl: '#',
    order: 2,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'AI-Powered Data Analysis Tool',
    description: 'Machine learning application for automated data insights and visualization',
    longDescription: 'An intelligent data analysis platform that uses machine learning algorithms to automatically discover patterns, generate insights, and create visualizations from complex datasets. Features include automated feature engineering, predictive modeling, and interactive dashboards.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'FastAPI', 'React', 'D3.js'],
    category: 'ai-ml',
    status: 'planned',
    githubUrl: '#',
    order: 3,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Real-time Data Dashboard',
    description: 'Interactive dashboard for real-time data monitoring and analytics',
    longDescription: 'A comprehensive dashboard solution for monitoring real-time data streams with advanced analytics capabilities. Features live data visualization, customizable widgets, alert systems, and export functionality for business intelligence.',
    technologies: ['Vue.js', 'Socket.io', 'Node.js', 'InfluxDB', 'Grafana', 'Redis'],
    category: 'data',
    status: 'planned',
    githubUrl: '#',
    order: 4,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'ai-ml', name: 'AI & ML' },
    { id: 'data', name: 'Data Science' }
  ]

  const filteredProjects = staticProjects.filter(project => 
    project.isVisible && (filter === 'all' || project.category === filter)
  ).sort((a, b) => a.order - b.order)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e'
      case 'in-progress': return '#f59e0b'
      case 'planned': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const formatStatus = (status: string) => {
    switch (status) {
      case 'in-progress': return 'In Progress'
      case 'completed': return 'Completed'
      case 'planned': return 'Planned'
      default: return status
    }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">A showcase of my work and technical expertise</p>
        </div>

        <div className="project-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
              <div className="project-header">
                <div className="project-info">
                  <span className="project-icon">
                    {project.category === 'ai-ml' ? '🤖' : 
                     project.category === 'data' ? '📊' : 
                     project.category === 'backend' ? '⚙️' : '🌐'}
                  </span>
                  <div className="project-status">
                    <span 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    ></span>
                    <span className="status-text">{formatStatus(project.status)}</span>
                  </div>
                </div>
              </div>
              
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-tech">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="tech-tag more">+{project.technologies.length - 3}</span>
                )}
              </div>
              
              <div className="project-links">
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link github">
                    <span>GitHub</span>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                )}
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link demo">
                    <span>Live Demo</span>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                      <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                ×
              </button>
              
              <div className="modal-header">
                <h3>{selectedProject.title}</h3>
                <div className="project-status">
                  <span 
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(selectedProject.status) }}
                  ></span>
                  <span className="status-text">{formatStatus(selectedProject.status)}</span>
                </div>
              </div>
              
              <div className="modal-content">
                <p>{selectedProject.longDescription}</p>
                
                <div className="modal-tech">
                  <h4>Technologies Used:</h4>
                  <div className="tech-grid">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-links">
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link github">
                      <span>View on GitHub</span>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </a>
                  )}
                  {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link demo">
                      <span>Live Demo</span>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects 