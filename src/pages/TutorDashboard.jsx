import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  MessageCircle, 
  DollarSign, 
  Star, 
  Settings, 
  User, 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  Camera, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Video,
  FileText,
  Globe,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  CheckCircle,
  AlertCircle,
  Play,
  Edit,
  Trash2,
  ExternalLink,
  Menu
} from 'lucide-react';
import styles from './TutorDashboard.module.css';

const mockUser = JSON.parse(localStorage.getItem('user')) || { 
  name: 'Dr. Sarah Johnson', 
  type: 'tutor',
  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  rating: 4.9,
  totalReviews: 156,
  totalStudents: 89,
  totalEarnings: 12500
};

const mockStats = {
  upcomingSessions: 3,
  totalEarnings: 12500,
  newMessages: 5,
  pendingReviews: 2
};

const mockSessions = [
  {
    id: 1,
    date: '2024-07-10',
    time: '16:00',
    student: 'Alex Johnson',
    subject: 'Mathematics',
    mode: 'online',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    joinLink: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 2,
    date: '2024-07-12',
    time: '18:00',
    student: 'Emily Rodriguez',
    subject: 'Calculus',
    mode: 'inperson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    location: 'Library Study Room 3'
  },
  {
    id: 3,
    date: '2024-07-15',
    time: '14:00',
    student: 'Michael Chen',
    subject: 'Statistics',
    mode: 'online',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    joinLink: 'https://meet.google.com/xyz-uvw-rst'
  }
];

const mockActivity = [
  {
    id: 1,
    type: 'review',
    text: 'New 5-star review from Alex Johnson',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'booking',
    text: 'New booking from Emily Rodriguez',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'message',
    text: 'Message from Michael Chen',
    time: '6 hours ago'
  },
  {
    id: 4,
    type: 'payment',
    text: 'Payment received: $150',
    time: '1 day ago'
  }
];

const mockProfile = {
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Experienced mathematics educator with a passion for making complex concepts accessible. Specializes in helping students build strong foundational skills.',
  subjects: ['Mathematics', 'Algebra', 'Calculus', 'Statistics'],
  hourlyRate: 75,
  education: 'PhD in Mathematics, MIT',
  experience: '8 years',
  location: 'New York, NY',
  languages: ['English', 'Spanish']
};

const navItems = [
  { label: 'Dashboard', icon: <Home size={20} />, to: '/tutor-dashboard' },
  { label: 'Sessions', icon: <Calendar size={20} />, to: '/tutor-sessions' },
  { label: 'Messages', icon: <MessageCircle size={20} />, to: '/tutor-messages' },
  { label: 'Earnings', icon: <DollarSign size={20} />, to: '/tutor-earnings' },
  { label: 'Reviews', icon: <Star size={20} />, to: '/tutor-reviews' },
  { label: 'Settings', icon: <Settings size={20} />, to: '/tutor-settings' }
];

const TutorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileData, setProfileData] = useState(mockProfile);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={styles.ratingStar}
        fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
        color={i < Math.floor(rating) ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addSubject = () => {
    if (newSubject.trim() && !profileData.subjects.includes(newSubject.trim())) {
      setProfileData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()]
      }));
      setNewSubject('');
      setShowAddSubject(false);
    }
  };

  const removeSubject = (subject) => {
    setProfileData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === new Date().toDateString();
      const isAvailable = Math.random() > 0.3; // Mock availability
      
      days.push({
        day: i,
        date,
        isToday,
        isAvailable
      });
    }
    
    return days;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleJoinSession = (session) => {
    if (session.joinLink) {
      window.open(session.joinLink, '_blank');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className={styles.dashboardRoot}>
      {/* Mobile Menu Toggle */}
      <button 
        className={styles.mobileMenuToggle}
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>

      {/* Dashboard Container */}
      <div className={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
          <nav className={styles.sidebarNav}>
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`${styles.sidebarNavItem} ${activeTab === item.label.toLowerCase() ? styles.active : ''}`}
                onClick={() => {
                  setActiveTab(item.label.toLowerCase());
                  closeSidebar();
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className={styles.sidebarOverlay}
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Dashboard Tab */}
          <div className={`${styles.tabContent} ${activeTab === 'dashboard' ? styles.active : ''}`}>
            <div className={styles.dashboardHeader}>
              Welcome back, {mockUser.name}! Here's your overview.
            </div>

            {/* Quick Stats */}
            <div className={styles.quickStats}>
              <div className={`${styles.statCard} ${styles.sessions}`}>
                <div className={styles.statHeader}>
                  <span className={styles.statTitle}>Upcoming Sessions</span>
                  <div className={`${styles.statIcon} ${styles.sessions}`}>
                    <Calendar size={20} />
                  </div>
                </div>
                <div className={styles.statValue}>{mockStats.upcomingSessions}</div>
                <div className={styles.statDescription}>Next session in 2 hours</div>
              </div>

              <div className={`${styles.statCard} ${styles.earnings}`}>
                <div className={styles.statHeader}>
                  <span className={styles.statTitle}>Total Earnings</span>
                  <div className={`${styles.statIcon} ${styles.earnings}`}>
                    <DollarSign size={20} />
                  </div>
                </div>
                <div className={styles.statValue}>{formatCurrency(mockStats.totalEarnings)}</div>
                <div className={styles.statDescription}>This month</div>
              </div>

              <div className={`${styles.statCard} ${styles.messages}`}>
                <div className={styles.statHeader}>
                  <span className={styles.statTitle}>New Messages</span>
                  <div className={`${styles.statIcon} ${styles.messages}`}>
                    <MessageCircle size={20} />
                  </div>
                </div>
                <div className={styles.statValue}>{mockStats.newMessages}</div>
                <div className={styles.statDescription}>Unread messages</div>
              </div>

              <div className={`${styles.statCard} ${styles.reviews}`}>
                <div className={styles.statHeader}>
                  <span className={styles.statTitle}>Pending Reviews</span>
                  <div className={`${styles.statIcon} ${styles.reviews}`}>
                    <Star size={20} />
                  </div>
                </div>
                <div className={styles.statValue}>{mockStats.pendingReviews}</div>
                <div className={styles.statDescription}>Awaiting feedback</div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className={styles.dashboardGrid}>
              {/* Upcoming Sessions */}
              <div className={styles.sessionsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Upcoming Sessions</h2>
                  <button className={styles.sectionAction}>View All</button>
                </div>
                <div className={styles.sessionsList}>
                  {mockSessions.map(session => (
                    <div key={session.id} className={styles.sessionItem}>
                      <div className={styles.sessionInfo}>
                        <img src={session.image} alt={session.student} className={styles.sessionAvatar} />
                        <div className={styles.sessionDetails}>
                          <div className={styles.sessionStudent}>{session.student}</div>
                          <div className={styles.sessionMeta}>
                            <span>{formatDate(session.date)} at {session.time}</span>
                            <span>{session.subject}</span>
                            <div className={`${styles.sessionMode} ${session.mode}`}>
                              {session.mode === 'online' ? <Globe size={12} /> : <Users size={12} />}
                              {session.mode === 'online' ? 'Online' : 'In-person'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.sessionActions}>
                        {session.mode === 'online' && session.joinLink && (
                          <button 
                            className={`${styles.sessionBtn} ${styles.primary}`}
                            onClick={() => handleJoinSession(session)}
                          >
                            <Play size={14} />
                            Join
                          </button>
                        )}
                        <button className={styles.sessionBtn}>
                          <Edit size={14} />
                          Reschedule
                        </button>
                        <button className={`${styles.sessionBtn} ${styles.danger}`}>
                          <X size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className={styles.activityFeed}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Recent Activity</h2>
                </div>
                <div className={styles.activityList}>
                  {mockActivity.map(activity => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={`${styles.activityIcon} ${activity.type}`}>
                        {activity.type === 'review' && <Star size={16} />}
                        {activity.type === 'booking' && <Calendar size={16} />}
                        {activity.type === 'message' && <MessageCircle size={16} />}
                        {activity.type === 'payment' && <DollarSign size={16} />}
                      </div>
                      <div className={styles.activityContent}>
                        <div className={styles.activityText}>{activity.text}</div>
                        <div className={styles.activityTime}>{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Tab */}
          <div className={`${styles.tabContent} ${activeTab === 'settings' ? styles.active : ''}`}>
            <div className={styles.dashboardHeader}>Profile & Settings</div>

            {/* Profile Section */}
            <div className={styles.profileSection}>
              <div className={styles.profileHeader}>
                <div className={styles.profileImage}>
                  <img src={mockUser.image} alt={mockUser.name} className={styles.profileAvatar} />
                  <label className={styles.uploadOverlay}>
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            // In a real app, upload to server
                            console.log('Profile picture updated');
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <div className={styles.profileInfo}>
                  <h2 className={styles.profileName}>{mockUser.name}</h2>
                  <div className={styles.profileRating}>
                    <div className={styles.ratingStars}>
                      {renderStars(mockUser.rating)}
                    </div>
                    <span className={styles.ratingText}>
                      {mockUser.rating} ({mockUser.totalReviews} reviews)
                    </span>
                  </div>
                  <div className={styles.profileStats}>
                    <div className={styles.profileStat}>
                      <div className={styles.statNumber}>{mockUser.totalStudents}</div>
                      <div className={styles.statLabel}>Students</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.statNumber}>{formatCurrency(mockUser.totalEarnings)}</div>
                      <div className={styles.statLabel}>Total Earnings</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.statNumber}>{mockUser.totalReviews}</div>
                      <div className={styles.statLabel}>Reviews</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profileData.name}
                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={profileData.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    value={profileData.phone}
                    onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Location</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profileData.location}
                    onChange={(e) => handleProfileUpdate('location', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Hourly Rate ($)</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={profileData.hourlyRate}
                    onChange={(e) => handleProfileUpdate('hourlyRate', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Education</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profileData.education}
                    onChange={(e) => handleProfileUpdate('education', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bio</label>
                  <textarea
                    className={styles.formTextarea}
                    value={profileData.bio}
                    onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Subjects You Teach</label>
                  <div className={styles.subjectsList}>
                    {profileData.subjects.map(subject => (
                      <div key={subject} className={styles.subjectTag}>
                        {subject}
                        <button
                          className={styles.removeSubject}
                          onClick={() => removeSubject(subject)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {showAddSubject ? (
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          placeholder="Add subject"
                          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                          onKeyPress={(e) => e.key === 'Enter' && addSubject()}
                        />
                        <button onClick={addSubject} style={{ padding: '0.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                          <Plus size={12} />
                        </button>
                        <button onClick={() => setShowAddSubject(false)} style={{ padding: '0.5rem', background: '#64748b', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className={styles.addSubjectBtn}
                        onClick={() => setShowAddSubject(true)}
                      >
                        <Plus size={12} />
                        Add Subject
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button className={styles.saveButton}>Save Changes</button>
            </div>

            {/* Schedule Section */}
            <div className={styles.calendarSection}>
              <div className={styles.calendarHeader}>
                <h2 className={styles.calendarTitle}>Schedule & Availability</h2>
                <div className={styles.calendarControls}>
                  <button className={styles.calendarBtn}>
                    <ChevronLeft size={16} />
                  </button>
                  <span style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button className={styles.calendarBtn}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.calendarGrid}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, color: '#64748b' }}>
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`${styles.calendarDay} ${
                      day ? (day.isToday ? styles.today : day.isAvailable ? styles.available : styles.unavailable) : ''
                    }`}
                    onClick={() => day && console.log('Toggle availability for:', day.date)}
                  >
                    {day ? day.day : ''}
                  </div>
                ))}
              </div>

              <div className={styles.availabilitySettings}>
                <h3 className={styles.availabilityTitle}>Time Slots</h3>
                <div className={styles.timeSlots}>
                  <div className={styles.timeSlot}>
                    <div className={styles.timeSlotInfo}>
                      <div className={styles.timeSlotTime}>9:00 AM - 11:00 AM</div>
                      <div className={styles.timeSlotDays}>Monday, Wednesday, Friday</div>
                    </div>
                    <label className={styles.timeSlotToggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.timeSlotSlider}></span>
                    </label>
                  </div>
                  <div className={styles.timeSlot}>
                    <div className={styles.timeSlotInfo}>
                      <div className={styles.timeSlotTime}>2:00 PM - 4:00 PM</div>
                      <div className={styles.timeSlotDays}>Tuesday, Thursday</div>
                    </div>
                    <label className={styles.timeSlotToggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.timeSlotSlider}></span>
                    </label>
                  </div>
                  <div className={styles.timeSlot}>
                    <div className={styles.timeSlotInfo}>
                      <div className={styles.timeSlotTime}>6:00 PM - 8:00 PM</div>
                      <div className={styles.timeSlotDays}>Monday, Tuesday, Wednesday</div>
                    </div>
                    <label className={styles.timeSlotToggle}>
                      <input type="checkbox" />
                      <span className={styles.timeSlotSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other tabs would be implemented similarly */}
          <div className={`${styles.tabContent} ${activeTab === 'sessions' ? styles.active : ''}`}>
            <div className={styles.dashboardHeader}>Sessions Management</div>
            <p>Session management interface would go here...</p>
          </div>

          <div className={`${styles.tabContent} ${activeTab === 'messages' ? styles.active : ''}`}>
            <div className={styles.dashboardHeader}>Messages</div>
            <p>Messages interface would go here...</p>
          </div>

          <div className={`${styles.tabContent} ${activeTab === 'earnings' ? styles.active : ''}`}>
            <div className={styles.dashboardHeader}>Earnings & Payments</div>
            <p>Earnings and payment interface would go here...</p>
          </div>

          <div className={`${styles.tabContent} ${activeTab === 'reviews' ? styles.active : ''}`}>
            <div className={styles.dashboardHeader}>Reviews & Feedback</div>
            <p>Reviews and feedback interface would go here...</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorDashboard; 