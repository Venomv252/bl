import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Home, Search, Calendar, MessageCircle, Star, Settings, User, Users, DollarSign } from 'lucide-react';
import styles from './StudentDashboard.module.css';

const navItems = [
  { label: 'Home Overview', icon: <Home size={20} />, to: '/student-dashboard' },
  { label: 'Find Tutors', icon: <Search size={20} />, to: '/tutors' },
  { label: 'My Bookings', icon: <Calendar size={20} />, to: '/my-bookings' },
  { label: 'Messages', icon: <MessageCircle size={20} />, to: '/messages' },
  { label: 'Reviews & Feedback', icon: <Star size={20} />, to: '/reviews-feedback' },
  { label: 'Settings', icon: <Settings size={20} />, to: '/settings' },
];

const mockUser = {
  name: 'Alex Johnson',
};

const StudentLayout = () => {
  return (
    <div className={styles.dashboardRoot}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.sidebarHeader} style={{ textDecoration: 'none', outline: 'none' }} tabIndex={0}>
          <BookOpen size={28} />
          BrightLearn
        </Link>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `${styles.sidebarNavItem} ${isActive ? styles.sidebarNavItemActive : ''}`
              }
              end={item.to === '/student-dashboard'}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.profileSection}>
          <div className={styles.profileAvatar}>
            {mockUser.name ? mockUser.name.charAt(0).toUpperCase() : <User size={20} />}
          </div>
          <span className={styles.profileName}>{mockUser.name}</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout; 