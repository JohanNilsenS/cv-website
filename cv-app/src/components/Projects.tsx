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
      longDescription: 'A comprehensive portfolio website showcasing my skills, projects, and experience. Built with modern web technologies and deployed using Docker and Dokploy for seamless CI/CD.',
      technologies: ['React', 'TypeScript', 'CSS3', 'Docker', 'Dokploy'],
      category: 'web',
      status: 'in-progress',
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Image Classification Model',
      description: 'Deep learning model for image recognition using convolutional neural networks',
      longDescription: 'Developed a CNN-based image classification system using TensorFlow and Keras. The model achieves high accuracy on standard datasets and includes data augmentation techniques.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
      category: 'ai-ml',
      status: 'completed',
      github: '#'
    },
    {
      id: 3,
      title: 'Natural Language Processing Tool',
      description: 'Text analysis and sentiment classification using transformer models',
      longDescription: 'Built an NLP pipeline for text preprocessing, feature extraction, and sentiment analysis. Implemented using transformer models and achieved competitive performance on benchmark datasets.',
      technologies: ['Python', 'PyTorch', 'Transformers', 'NLTK', 'Pandas'],
      category: 'ai-ml',
      status: 'completed',
      github: '#'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for exploring and analyzing complex datasets',
      longDescription: 'Created an interactive web-based dashboard for data exploration and visualization. Features multiple chart types, filtering capabilities, and real-time data updates.',
      technologies: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'SQL'],
      category: 'data',
      status: 'completed',
      github: '#'
    },
    {
      id: 5,
      title: 'Predictive Analytics System',
      description: 'Machine learning system for forecasting and trend analysis',
      longDescription: 'Developed a comprehensive predictive analytics system using various ML algorithms. Includes time series forecasting, anomaly detection, and automated model selection.',
      technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Prophet', 'Docker'],
      category: 'ai-ml',
      status: 'planned',
      github: '#'
    },
    {
      id: 6,
      title: 'API Development Project',
      description: 'RESTful API with authentication and real-time features',
      longDescription: 'Built a scalable REST API with user authentication, real-time updates via WebSockets, and comprehensive documentation. Deployed on cloud infrastructure with monitoring.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
      category: 'web',
      status: 'planned',
      github: '#'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ai-ml', name: 'AI & ML' },
    { id: 'data', name: 'Data Science' },
    { id: 'web', name: 'Web Development' }
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
                     project.category === 'data' ? '📊' : '🌐'}
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