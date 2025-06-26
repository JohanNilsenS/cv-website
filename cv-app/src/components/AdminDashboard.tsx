import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: string;
  githubUrl?: string;
  demoUrl?: string;
  isVisible: boolean;
  order: number;
}

interface AdminDashboardProps {
  token: string;
  user: any;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'projects'>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = 'https://johancv.com';

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${apiUrl}/api${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const result = await apiCall('/contacts');
      if (result.success) {
        setContacts(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const result = await apiCall('/projects');
      if (result.success) {
        setProjects(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const markContactAsRead = async (contactId: string) => {
    try {
      await apiCall(`/contacts/${contactId}/read`, { method: 'PATCH' });
      setContacts(prev => prev.map(contact => 
        contact.id === contactId ? { ...contact, isRead: true } : contact
      ));
    } catch (error) {
      console.error('Error marking contact as read:', error);
      setError('Failed to update contact');
    }
  };

  const deleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await apiCall(`/contacts/${contactId}`, { method: 'DELETE' });
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Failed to delete contact');
    }
  };

  const toggleProjectVisibility = async (projectId: string, isVisible: boolean) => {
    try {
      await apiCall(`/projects/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify({ isVisible: !isVisible }),
      });
      setProjects(prev => prev.map(project => 
        project.id === projectId ? { ...project, isVisible: !isVisible } : project
      ));
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Failed to update project');
    }
  };

  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    } else {
      fetchProjects();
    }
  }, [activeTab]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-user-info">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user.name}</p>
          </div>
          <button onClick={onLogout} className="btn btn-outline">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts ({contacts.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects ({projects.length})
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}

        {activeTab === 'contacts' && (
          <div className="contacts-section">
            <h2>Contact Submissions</h2>
            {contacts.length === 0 ? (
              <p className="no-data">No contacts yet.</p>
            ) : (
              <div className="contacts-grid">
                {contacts.map(contact => (
                  <div key={contact.id} className={`contact-card ${contact.isRead ? 'read' : 'unread'}`}>
                    <div className="contact-header">
                      <div className="contact-info">
                        <h3>{contact.name}</h3>
                        <p className="contact-email">{contact.email}</p>
                        <p className="contact-date">{formatDate(contact.createdAt)}</p>
                      </div>
                      <div className="contact-actions">
                        {!contact.isRead && (
                          <button 
                            onClick={() => markContactAsRead(contact.id)}
                            className="btn btn-small btn-primary"
                          >
                            Mark Read
                          </button>
                        )}
                        <button 
                          onClick={() => deleteContact(contact.id)}
                          className="btn btn-small btn-outline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="contact-content">
                      <h4>{contact.subject}</h4>
                      <p>{contact.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="projects-section">
            <h2>Project Management</h2>
            {projects.length === 0 ? (
              <p className="no-data">No projects yet.</p>
            ) : (
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className={`project-card ${project.isVisible ? 'visible' : 'hidden'}`}>
                    <div className="project-header">
                      <div className="project-info">
                        <h3>{project.title}</h3>
                        <span className={`status-badge ${project.status}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="project-actions">
                        <button 
                          onClick={() => toggleProjectVisibility(project.id, project.isVisible)}
                          className={`btn btn-small ${project.isVisible ? 'btn-outline' : 'btn-primary'}`}
                        >
                          {project.isVisible ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                    <div className="project-content">
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      {(project.githubUrl || project.demoUrl) && (
                        <div className="project-links">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          )}
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 