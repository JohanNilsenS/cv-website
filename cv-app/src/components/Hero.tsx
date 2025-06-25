import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-particles"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-greeting">Hello, I'm</span>
              <span className="hero-name">Johan Nilsen Stjernquist</span>
            </h1>
            
            <h2 className="hero-subtitle">
              AI & Machine Learning Engineer
            </h2>
            
            <p className="hero-description">
              Recently graduated with expertise in artificial intelligence and machine learning. 
              Passionate about creating intelligent solutions that make a real-world impact.
            </p>
            
            <div className="hero-buttons">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="btn btn-primary"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn btn-secondary"
              >
                Get In Touch
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-avatar">
              <div className="avatar-placeholder">
                <span className="avatar-initials">JNS</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <button 
            onClick={() => scrollToSection('about')}
            className="scroll-down"
            aria-label="Scroll to about section"
          >
            <span className="scroll-arrow"></span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero 