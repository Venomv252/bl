import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const handleAboutClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const section = document.getElementById('about');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <BookOpen className="logo-icon" />
              <span>BrightLearn</span>
            </div>
            <p>Connecting students with expert tutors for personalized learning experiences.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tutors">Find Tutors</Link></li>
              <li><Link to="/#about" onClick={handleAboutClick}>About</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Popular Subjects</h4>
            <ul>
              <li><a href="#">Mathematics</a></li>
              <li><a href="#">Physics</a></li>
              <li><a href="#">English</a></li>
              <li><a href="#">Computer Science</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 info@brightlearn.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Learning St, Education City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BrightLearn. All rights reserved.</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, color: '#64748b', fontSize: '0.95rem' }}>
          Developed by Aryan |
          <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', margin: '0 6px' }}>LinkedIn</a>|
          <a href="https://github.com/Venomv252" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', margin: '0 6px' }}>GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 