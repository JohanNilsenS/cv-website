import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/johan-stjernquist',
      icon: '💼'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/johan-stjernquist',
      icon: '🐙'
    },
    {
      name: 'Email',
      url: 'mailto:johan.stjernquist@example.com',
      icon: '📧'
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Johan Nilsen Stjernquist</h3>
              <p>AI & Machine Learning Engineer</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Expertise</h4>
                <ul>
                  <li>Machine Learning</li>
                  <li>Deep Learning</li>
                  <li>Data Science</li>
                  <li>Python Development</li>
                  <li>Web Development</li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Connect</h4>
                <div className="social-links">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={link.name}
                    >
                      <span className="social-icon">{link.icon}</span>
                      <span className="social-name">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Johan Nilsen Stjernquist. All rights reserved.</p>
              <p className="footer-note">
                Built with React, TypeScript, and passion for AI/ML
              </p>
            </div>
            
            <button 
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span className="back-to-top-icon">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 