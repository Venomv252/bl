import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudentDashboard.module.css';
import { Home, Search, Calendar, MessageCircle, Star, Settings, User, Users, Clock, DollarSign, ArrowRight, Mail, BookOpen } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const mockUser = JSON.parse(localStorage.getItem('user')) || { name: 'Aryan', type: 'student' };

// Mapping of tutor names to their IDs for navigation
const tutorNameToId = {
  'Prof. Michael Chen': 2,
  'Ms. Emily Rodriguez': 3,
  'Dr. James Wilson': 4,
  'Dr. Sarah Johnson': 1,
  'Ms. Lisa Thompson': 5,
  'Prof. David Kim': 6
};

const mockStats = {
  nextSession: {
    date: '2024-07-10',
    time: '16:00',
    tutor: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
  },
  totalTutors: 4,
  pendingPayments: 1,
};

const mockSuggestedTutors = [
  {
    name: 'Prof. Michael Chen',
    subject: 'Physics',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Ms. Emily Rodriguez',
    subject: 'English Literature',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Dr. James Wilson',
    subject: 'Chemistry',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
];

const mockSessions = [
  {
    date: '2024-07-10',
    time: '16:00',
    tutor: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
  },
  {
    date: '2024-07-12',
    time: '18:00',
    tutor: 'Ms. Lisa Thompson',
    subject: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
];

const mockMessages = [
  {
    tutor: 'Dr. Sarah Johnson',
    lastMessage: 'See you at 4pm tomorrow!',
    unread: 2,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
  },
  {
    tutor: 'Ms. Lisa Thompson',
    lastMessage: 'Let me know if you have any questions.',
    unread: 0,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
];

const navItems = [
  { label: 'Home Overview', icon: <Home size={20} />, to: '/student-dashboard' },
  { label: 'Find Tutors', icon: <Search size={20} />, to: '/tutors' },
  { label: 'My Bookings', icon: <Calendar size={20} />, to: '/my-bookings' },
  { label: 'Messages', icon: <MessageCircle size={20} />, to: '/messages' },
  { label: 'Reviews & Feedback', icon: <Star size={20} />, to: '/reviews-feedback' },
  { label: 'Settings', icon: <Settings size={20} />, to: '/settings' },
];

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleViewProfile = (tutorName) => {
    const tutorId = tutorNameToId[tutorName];
    if (tutorId) {
      navigate(`/tutor/${tutorId}`);
    }
  };

  return (
    <>
      <div className={styles.dashboardHeader}>
        Welcome back, {mockUser.name}! Here's your overview.
      </div>
      <div className={styles.dashboardGrid}>
        {/* Quick Stats */}
        <div className={`${styles.card} ${styles.quickStats}`}>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Next Scheduled Session</span>
            <span>
              {mockStats.nextSession.date} at {mockStats.nextSession.time} <br />
              with {mockStats.nextSession.tutor} ({mockStats.nextSession.subject})
              <button className={styles.sessionBtn} style={{ marginLeft: 12 }}>View Details</button>
            </span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Total Tutors Contacted</span>
            <span><Users size={18} style={{ marginRight: 4 }} /> {mockStats.totalTutors}</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Pending Payments</span>
            <span style={{ color: mockStats.pendingPayments ? '#dc2626' : '#059669', fontWeight: 700 }}>
              <DollarSign size={18} style={{ marginRight: 4 }} />
              {mockStats.pendingPayments ? `${mockStats.pendingPayments} Pending` : 'None'}
            </span>
          </div>
        </div>
        {/* Suggested Tutors */}
        <div className={`${styles.card} ${styles.suggestedTutors}`}>
          <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.1rem', marginBottom: 8 }}>Suggested Tutors</div>
          <div className={styles.tutorGrid}>
            {mockSuggestedTutors.map(tutor => (
              <div className={styles.tutorCard} key={tutor.name}>
                <img src={tutor.image} alt={tutor.name} className={styles.tutorAvatar} />
                <div className={styles.tutorName}>{tutor.name}</div>
                <div className={styles.tutorSubject}>{tutor.subject}</div>
                <div className={styles.tutorRating}><Star size={16} /> {tutor.rating}</div>
                <button 
                  className={styles.tutorBtn}
                  onClick={() => handleViewProfile(tutor.name)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button 
              className={styles.tutorBtn}
              onClick={() => navigate('/tutors')}
              style={{ 
                background: '#2563eb', 
                color: '#fff', 
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.background = '#2563eb'}
            >
              <Search size={16} style={{ marginRight: '0.5rem' }} />
              Find More Tutors
            </button>
          </div>
        </div>
      </div>
      {/* Upcoming Sessions */}
      <div className={`${styles.card} ${styles.upcomingSessions}`}>
        <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.1rem', marginBottom: 8 }}>Upcoming Sessions</div>
        {mockSessions.map(session => (
          <div className={styles.sessionRow} key={session.date + session.time}>
            <div className={styles.sessionTutor}>
              <img src={session.image} alt={session.tutor} className={styles.sessionAvatar} />
              <div>
                <div style={{ fontWeight: 600 }}>{session.tutor}</div>
                <div style={{ fontSize: '0.95rem', color: '#64748b' }}>{session.subject}</div>
                <div style={{ fontSize: '0.95rem', color: '#64748b' }}>{session.date} at {session.time}</div>
              </div>
            </div>
            <div className={styles.sessionActions}>
              <button className={styles.sessionBtn}>Cancel</button>
              <button className={styles.sessionBtn}>Reschedule</button>
            </div>
          </div>
        ))}
      </div>
      {/* Messages Preview */}
      <div className={`${styles.card} ${styles.messagesPreview}`}>
        <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.1rem', marginBottom: 8 }}>Messages Preview</div>
        {mockMessages.map(msg => (
          <div className={styles.messageRow} key={msg.tutor}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={msg.image} alt={msg.tutor} className={styles.sessionAvatar} />
              <div>
                <div style={{ fontWeight: 600 }}>{msg.tutor}</div>
                <div style={{ fontSize: '0.95rem', color: '#64748b' }}>{msg.lastMessage}</div>
              </div>
            </div>
            {msg.unread > 0 && <div className={styles.messageUnread}>{msg.unread}</div>}
            <ArrowRight size={18} style={{ color: '#2563eb' }} />
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentDashboard; 