import React from 'react'
import './Skills.css'

interface Skill {
  name: string
  level: number
  category: string
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    // AI/ML Skills
    { name: 'Python', level: 90, category: 'AI/ML' },
    { name: 'TensorFlow', level: 85, category: 'AI/ML' },
    { name: 'PyTorch', level: 80, category: 'AI/ML' },
    { name: 'Scikit-learn', level: 85, category: 'AI/ML' },
    { name: 'Pandas', level: 90, category: 'AI/ML' },
    { name: 'NumPy', level: 90, category: 'AI/ML' },
    
    // Data & Analytics
    { name: 'Data Analysis', level: 85, category: 'Data' },
    { name: 'Statistical Modeling', level: 80, category: 'Data' },
    { name: 'Data Visualization', level: 85, category: 'Data' },
    { name: 'SQL', level: 75, category: 'Data' },
    
    // Development
    { name: 'JavaScript', level: 80, category: 'Development' },
    { name: 'TypeScript', level: 75, category: 'Development' },
    { name: 'React', level: 80, category: 'Development' },
    { name: 'Git', level: 85, category: 'Development' },
    
    // Tools & Cloud
    { name: 'Docker', level: 70, category: 'Tools' },
    { name: 'AWS', level: 65, category: 'Tools' },
    { name: 'Jupyter', level: 90, category: 'Tools' },
    { name: 'Linux', level: 75, category: 'Tools' }
  ]

  const categories = ['AI/ML', 'Data', 'Development', 'Tools']

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category)
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">My technical expertise and proficiency levels</p>
        </div>
        
        <div className="skills-content">
          {categories.map(category => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="skills-grid">
                {getSkillsByCategory(category).map(skill => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="skills-summary">
          <div className="summary-item">
            <div className="summary-icon">🤖</div>
            <div className="summary-content">
              <h4>Machine Learning</h4>
              <p>Deep learning, neural networks, computer vision, NLP</p>
            </div>
          </div>
          
          <div className="summary-item">
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <h4>Data Science</h4>
              <p>Statistical analysis, data mining, predictive modeling</p>
            </div>
          </div>
          
          <div className="summary-item">
            <div className="summary-icon">💻</div>
            <div className="summary-content">
              <h4>Software Development</h4>
              <p>Full-stack development, API design, cloud deployment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills 