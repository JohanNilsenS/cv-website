import React, { useState, useEffect } from 'react'
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

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const apiUrl = import.meta.env.VITE_API_URL || 
    (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://johancv.com')
      const response = await fetch(`${apiUrl}/api/projects`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: ApiResponse<Project[]> = await response.json()
      
      if (result.success && result.data) {
        setProjects(result.data)
      } else {
        throw new Error(result.error || 'Failed to fetch projects')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError('Failed to load projects. Please try again later.')
      
      // Fallback to static data if API fails
      setProjects([
        {
          id: '1',
          title: 'CV Portfolio Website',
          description: 'Modern, responsive portfolio website built with React and TypeScript',
          longDescription: 'A comprehensive portfolio website showcasing my skills, projects, and experience. Built with modern web technologies and deployed using Docker and Dokploy for seamless CI/CD. Features responsive design, smooth animations, and optimized performance.',
          technologies: ['React', 'TypeScript', 'CSS3', 'Docker', 'Dokploy', 'Nginx'],
          category: 'web',
          status: 'completed',
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
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'ai-ml', name: 'AI & ML' },
    { id: 'data', name: 'Data Science' }
  ]

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  )

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

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">Loading projects...</p>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">A showcase of my work and technical expertise</p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchProjects} className="retry-button">
              Try Again
            </button>
          </div>
        )}

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
                  <span className="tech-more">+{project.technologies.length - 3} more</span>
                )}
              </div>
              
              <div className="project-links">
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="project-link"
                  >
                    <span>📁</span> Code
                  </a>
                )}
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="project-link"
                  >
                    <span>🚀</span> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="no-projects">
            <p>No projects found for the selected category.</p>
          </div>
        )}

        {selectedProject && (
          <div className="project-modal" onClick={() => setSelectedProject(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
              
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
              
              <p className="modal-description">{selectedProject.longDescription}</p>
              
              <div className="modal-tech">
                <h4>Technologies Used:</h4>
                <div className="tech-list">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-links">
                {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <span>📁</span> View Code
                  </a>
                )}
                {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                  <a 
                    href={selectedProject.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>🚀</span> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects 