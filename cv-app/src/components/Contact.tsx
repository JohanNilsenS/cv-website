import React, { useState } from 'react'
import './Contact.css'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio Website')
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    )
    
    const mailtoLink = `mailto:johanstjernquist1@gmail.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'johanstjernquist1@gmail.com',
      link: 'mailto:johanstjernquist1@gmail.com'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Johan Nilsen Stjernquist',
      link: 'https://www.linkedin.com/in/johan-nilsen-stjernquist-692743208/'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: '@johan-stjernquist',
      link: 'https://github.com/JohanNilsenS/'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Available for Remote Work, and in Gothenburg, Sweden',
      link: null
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss opportunities and collaborations</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>Let's Connect!</h3>
              <p>
                I'm always interested in discussing new opportunities, innovative projects, 
                and potential collaborations in AI and machine learning. Whether you have 
                a project in mind or just want to chat about technology, feel free to reach out!
              </p>
            </div>
            
            <div className="contact-details">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div className="contact-text">
                    <div className="contact-label">{item.label}</div>
                    {item.link ? (
                      <a href={item.link} className="contact-value" target="_blank" rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <div className="contact-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="contact-availability">
              <div className="availability-status">
                <div className="status-indicator available"></div>
                <span>Available for new opportunities</span>
              </div>
              <p>Open to full-time positions, freelance projects, and collaborations</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-info">
                <p>Fill out the form below and it will open your email client with the message pre-filled.</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project, idea, or just say hello!"
                  rows={6}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
              
              <div className="form-note">
                <p>
                  Alternatively, you can reach me directly at{' '}
                  <a href="mailto:johanstjernquist1@gmail.com">
                    johanstjernquist1@gmail.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 