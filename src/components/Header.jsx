import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, User as UserIcon } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  // Helper to scroll to section if on homepage, otherwise go to homepage and scroll
  const handleNavClick = (e, sectionId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Avatar: use initial or icon
  const renderAvatar = () => {
    if (user?.name) {
      return (
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: '#e0e7ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, marginRight: 8
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      );
    }
    return (
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e0e7ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
        <UserIcon size={20} />
      </div>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <a href="https://brightlearn.in" target="_blank" rel="noopener noreferrer">
            <BookOpen className="logo-icon" />
            <span>BrightLearn</span>
          </a>
        </div>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}> 
          <Link to="/" onClick={e => handleNavClick(e, 'home')}>Home</Link>
          <Link to="/tutors">Find Tutors</Link>
          <Link to="/#about" onClick={e => handleNavClick(e, 'about')}>About</Link>
        </nav>
        <div className="header-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          ) : (
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {renderAvatar()}
              <span className="user-greeting" style={{ fontWeight: 600, color: '#2563eb', marginRight: 12 }}>
                {user.name || 'Profile'}
              </span>
              <Link
                to={user.type === 'tutor' ? '/tutor-dashboard' : '/student-dashboard'}
                className="btn btn-primary"
                style={{ marginRight: 8 }}
              >
                Dashboard
              </Link>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </div>
          )}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 