import React from 'react'
import './About.css'

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <div className="about-description">
              <p>
                I'm a recent graduate with a strong foundation in artificial intelligence and machine learning. 
                My academic journey has equipped me with both theoretical knowledge and practical skills in 
                developing intelligent systems.
              </p>
              
              <p>
                Throughout my studies, I've worked on various projects ranging from computer vision and 
                natural language processing to predictive modeling and deep learning applications. 
                I'm passionate about leveraging AI to solve real-world problems and create meaningful impact.
              </p>
              
              <p>
                Currently, I'm working on expanding my portfolio with innovative projects that showcase 
                my abilities in machine learning, data science, and software development. I'm always 
                eager to learn new technologies and collaborate on exciting challenges.
              </p>
            </div>
            
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">🎓</div>
                <div className="highlight-content">
                  <h3>Education</h3>
                  <p>AI & Machine Learning Studies</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">💡</div>
                <div className="highlight-content">
                  <h3>Innovation</h3>
                  <p>Creative problem-solving approach</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">🚀</div>
                <div className="highlight-content">
                  <h3>Growth</h3>
                  <p>Continuous learning mindset</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">2025</div>
              <div className="stat-label">Graduate Year from IT-Högskolan</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">AI/ML + Frontend</div>
              <div className="stat-label">Specialization</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Learning Journey</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 