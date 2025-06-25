import React, { useState } from 'react'
import './Projects.css'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  github?: string
  demo?: string
  image?: string
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'CV Portfolio Website',
      description: 'Modern, responsive portfolio website built with React and TypeScript',
      longDescription: 'A comprehensive portfolio website showcasing my skills, projects, and experience. Built with modern web technologies and deployed using Docker and Dokploy for seamless CI/CD. Features responsive design, smooth animations, and optimized performance.',
      technologies: ['React', 'TypeScript', 'CSS3', 'Docker', 'Dokploy', 'Nginx'],
      category: 'web',
      status: 'completed',
      github: 'https://github.com/johan-stjernquist/cv-website',
      demo: 'https://johancv.com'
    },
    {
      id: 2,
      title: 'Portfolio Backend API',
      description: 'Full-stack backend system with database integration and email services',
      longDescription: 'A comprehensive backend system that powers the portfolio website with features including contact form submissions stored in database, email notifications, and a REST API for dynamic project management. Built with Node.js, Express, and PostgreSQL with proper authentication and validation.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Nodemailer', 'JWT', 'Docker'],
      category: 'backend',
      status: 'in-progress',
      github: '#'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'ai-ml', name: 'AI & ML' },
    { id: 'data', name: 'Data Science' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50'
      case 'in-progress': return '#FF9800'
      case 'planned': return '#2196F3'
      default: return '#666'
    }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Showcasing my work and technical expertise</p>
        </div>
        
        <div className="projects-filter">
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
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <span className="project-icon">
                    {project.category === 'ai-ml' ? '🤖' : 
                     project.category === 'data' ? '📊' : 
                     project.category === 'backend' ? '⚙️' : '🌐'}
                  </span>
                </div>
                <div className="project-status" style={{ backgroundColor: getStatusColor(project.status) }}>
                  {project.status.replace('-', ' ')}
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-more">+{project.technologies.length - 3}</span>
                  )}
                </div>
                
                <div className="project-actions">
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => setSelectedProject(project)}
                  >
                    Learn More
                  </button>
                  {project.github && (
                    <a href={project.github} className="btn btn-outline btn-small">
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} className="btn btn-primary btn-small">
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            
            <h3>{selectedProject.title}</h3>
            <p className="modal-description">{selectedProject.longDescription}</p>
            
            <div className="modal-tech">
              <h4>Technologies Used:</h4>
              <div className="tech-list">
                {selectedProject.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              {selectedProject.github && (
                <a href={selectedProject.github} className="btn btn-outline">
                  View on GitHub
                </a>
              )}
              {selectedProject.demo && (
                <a href={selectedProject.demo} className="btn btn-primary">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects 