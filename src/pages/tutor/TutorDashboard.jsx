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
  Menu,
  Phone,
  Paperclip,
  Image,
  MessageSquare,
  Send
} from 'lucide-react';
import styles from './TutorDashboard.module.css';
import TutorMessages from './TutorMessages';
import TutorSessions from './TutorSessions';

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
    duration: '60 min',
    rate: 75,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    joinLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Focus on calculus integration techniques',
    studentEmail: 'alex.johnson@email.com',
    studentPhone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    date: '2024-07-12',
    time: '18:00',
    student: 'Emily Rodriguez',
    subject: 'Calculus',
    mode: 'inperson',
    duration: '90 min',
    rate: 75,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    location: 'Library Study Room 3',
    notes: 'Review differential equations',
    studentEmail: 'emily.rodriguez@email.com',
    studentPhone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    date: '2024-07-15',
    time: '14:00',
    student: 'Michael Chen',
    subject: 'Statistics',
    mode: 'online',
    duration: '60 min',
    rate: 75,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    joinLink: 'https://meet.google.com/xyz-uvw-rst',
    notes: 'Probability distributions and hypothesis testing',
    studentEmail: 'michael.chen@email.com',
    studentPhone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    date: '2024-07-08',
    time: '15:00',
    student: 'Sarah Williams',
    subject: 'Algebra',
    mode: 'online',
    duration: '60 min',
    rate: 75,
    status: 'past',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    paymentStatus: 'paid',
    reviewStatus: 'reviewed',
    rating: 5,
    review: 'Excellent session! Very helpful with quadratic equations.',
    notes: 'Covered quadratic equations and factoring techniques. Student showed good progress.',
    studentEmail: 'sarah.williams@email.com',
    studentPhone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    date: '2024-07-05',
    time: '17:00',
    student: 'David Brown',
    subject: 'Geometry',
    mode: 'inperson',
    duration: '90 min',
    rate: 75,
    status: 'past',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    location: 'Coffee Shop Downtown',
    paymentStatus: 'paid',
    reviewStatus: 'pending',
    notes: 'Worked on circle theorems and area calculations. Student needs more practice with proofs.',
    studentEmail: 'david.brown@email.com',
    studentPhone: '+1 (555) 567-8901'
  },
  {
    id: 6,
    date: '2024-07-03',
    time: '16:30',
    student: 'Lisa Garcia',
    subject: 'Trigonometry',
    mode: 'online',
    duration: '60 min',
    rate: 75,
    status: 'cancelled',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    cancelReason: 'Student requested reschedule due to illness',
    studentEmail: 'lisa.garcia@email.com',
    studentPhone: '+1 (555) 678-9012'
  }
];

const mockStudents = [
  'Alex Johnson',
  'Emily Rodriguez', 
  'Michael Chen',
  'Sarah Williams',
  'David Brown',
  'Lisa Garcia'
];

const mockSubjects = [
  'Mathematics',
  'Algebra',
  'Calculus',
  'Statistics',
  'Geometry',
  'Trigonometry'
];

const mockConversations = [
  {
    id: 1,
    student: 'Alex Johnson',
    subject: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Hey, I\'d like to check your availability this week.',
    lastMessageTime: '2:30 PM',
    unreadCount: 2,
    isOnline: true,
    isImportant: false,
    status: 'active'
  },
  {
    id: 2,
    student: 'Emily Rodriguez',
    subject: 'Calculus',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Thanks for the session yesterday!',
    lastMessageTime: '1:45 PM',
    unreadCount: 0,
    isOnline: false,
    isImportant: true,
    status: 'completed'
  },
  {
    id: 3,
    student: 'Michael Chen',
    subject: 'Statistics',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Can you help me with probability distributions?',
    lastMessageTime: '11:20 AM',
    unreadCount: 1,
    isOnline: true,
    isImportant: false,
    status: 'pending'
  },
  {
    id: 4,
    student: 'Sarah Williams',
    subject: 'Algebra',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'I\'ve uploaded the assignment file.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    isImportant: false,
    status: 'active'
  },
  {
    id: 5,
    student: 'David Brown',
    subject: 'Geometry',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'When is our next session?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    isImportant: false,
    status: 'active'
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      sender: 'student',
      message: 'Hi Dr. Johnson! I hope you\'re doing well.',
      timestamp: '2:00 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 2,
      sender: 'tutor',
      message: 'Hello Alex! I\'m doing great, thank you. How can I help you today?',
      timestamp: '2:05 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 3,
      sender: 'student',
      message: 'I\'m having trouble with calculus integration techniques. Do you have any availability this week?',
      timestamp: '2:15 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 4,
      sender: 'tutor',
      message: 'Of course! I have several slots available. Let me check my schedule and send you some options.',
      timestamp: '2:20 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 5,
      sender: 'student',
      message: 'Hey, I\'d like to check your availability this week.',
      timestamp: '2:30 PM',
      isRead: false,
      attachments: []
    }
  ],
  2: [
    {
      id: 1,
      sender: 'student',
      message: 'Thank you so much for the session yesterday!',
      timestamp: '1:30 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 2,
      sender: 'tutor',
      message: 'You\'re very welcome, Emily! I\'m glad I could help with the differential equations.',
      timestamp: '1:35 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 3,
      sender: 'student',
      message: 'Thanks for the session yesterday!',
      timestamp: '1:45 PM',
      isRead: true,
      attachments: []
    }
  ],
  3: [
    {
      id: 1,
      sender: 'student',
      message: 'Hi Dr. Johnson, I\'m struggling with probability distributions in my statistics class.',
      timestamp: '11:00 AM',
      isRead: true,
      attachments: []
    },
    {
      id: 2,
      sender: 'tutor',
      message: 'Hello Michael! Probability distributions can be tricky. Which specific concepts are you finding challenging?',
      timestamp: '11:10 AM',
      isRead: true,
      attachments: []
    },
    {
      id: 3,
      sender: 'student',
      message: 'Can you help me with probability distributions?',
      timestamp: '11:20 AM',
      isRead: false,
      attachments: []
    }
  ]
};

const quickTemplates = [
  "Here are my available slots for this week:",
  "Please send the syllabus or assignment details.",
  "I'm available for a session tomorrow at 3 PM.",
  "Let me know if you have any questions about the material.",
  "I've reviewed your work and have some feedback."
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

  // Session management state
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [sessionToCancel, setSessionToCancel] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Messaging state
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [conversationSearch, setConversationSearch] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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

  // Session management functions
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesStudent = studentFilter === 'all' || session.student === studentFilter;
    const matchesSubject = subjectFilter === 'all' || session.subject === subjectFilter;
    
    return matchesSearch && matchesStatus && matchesStudent && matchesSubject;
  });

  const upcomingSessions = filteredSessions.filter(s => s.status === 'upcoming');
  const pastSessions = filteredSessions.filter(s => s.status === 'past');
  const cancelledSessions = filteredSessions.filter(s => s.status === 'cancelled');

  const handleRescheduleSession = (session) => {
    // In a real app, this would open a reschedule modal
    console.log('Reschedule session:', session.id);
  };

  const handleCancelSession = (session) => {
    setSessionToCancel(session);
    setShowCancelModal(true);
  };

  const confirmCancelSession = () => {
    if (sessionToCancel) {
      setSessions(prev => prev.map(s => 
        s.id === sessionToCancel.id 
          ? { ...s, status: 'cancelled', cancelReason: 'Cancelled by tutor' }
          : s
      ));
    }
    setShowCancelModal(false);
    setSessionToCancel(null);
  };

  const handleMessageStudent = (session) => {
    // In a real app, this would navigate to messages
    console.log('Message student:', session.student);
  };

  const handleAddNotes = (session) => {
    setSelectedSession(session);
    setSessionNotes(session.notes || '');
    setShowSessionModal(true);
  };

  const saveSessionNotes = () => {
    if (selectedSession) {
      setSessions(prev => prev.map(s => 
        s.id === selectedSession.id 
          ? { ...s, notes: sessionNotes }
          : s
      ));
    }
    setShowSessionModal(false);
    setSelectedSession(null);
    setSessionNotes('');
  };

  const openSessionDetails = (session) => {
    setSelectedSession(session);
    setShowSessionModal(true);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'upcoming': return '#059669';
      case 'past': return '#6b7280';
      case 'cancelled': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusBadgeBg = (status) => {
    switch (status) {
      case 'upcoming': return '#dcfce7';
      case 'past': return '#f3f4f6';
      case 'cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  // Messaging functions
  const filteredConversations = conversations.filter(conversation =>
    conversation.student.toLowerCase().includes(conversationSearch.toLowerCase()) ||
    conversation.subject.toLowerCase().includes(conversationSearch.toLowerCase())
  );

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    // Important conversations first
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    
    // Then by unread count
    if (a.unreadCount > b.unreadCount) return -1;
    if (a.unreadCount < b.unreadCount) return 1;
    
    // Then by last message time (most recent first)
    return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
  });

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Mark messages as read
    if (conversation.unreadCount > 0) {
      setConversations(prev => prev.map(conv =>
        conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
      ));
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      sender: 'tutor',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isRead: false,
      attachments: []
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), message]
    }));

    // Update conversation last message
    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            lastMessage: newMessage,
            lastMessageTime: message.timestamp,
            unreadCount: 0
          }
        : conv
    ));

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTemplateSelect = (template) => {
    setNewMessage(template);
    setShowTemplates(false);
  };

  const handleBookSession = () => {
    // In a real app, this would navigate to booking
    console.log('Book session for:', selectedConversation?.student);
  };

  const toggleImportant = (conversationId) => {
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId ? { ...conv, isImportant: !conv.isImportant } : conv
    ));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, upload file and get URL
      console.log('File uploaded:', file.name);
    }
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
                  {upcomingSessions.map(session => (
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

          {/* Sessions Tab */}
          <div className={`${styles.tabContent} ${activeTab === 'sessions' ? styles.active : ''}`}>
            <div className={styles.dashboardHeader}>Sessions Management</div>
            
            {/* Filters and Search */}
            <div className={styles.sessionsFilters}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search by student name or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              
              <div className={styles.filterGroup}>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select 
                  value={studentFilter} 
                  onChange={(e) => setStudentFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Students</option>
                  {mockStudents.map(student => (
                    <option key={student} value={student}>{student}</option>
                  ))}
                </select>
                
                <select 
                  value={subjectFilter} 
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Subjects</option>
                  {mockSubjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upcoming Sessions */}
            {upcomingSessions.length > 0 && (
              <div className={styles.sessionsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Upcoming Sessions</h2>
                  <span className={styles.sessionCount}>{upcomingSessions.length} sessions</span>
                </div>
                <div className={styles.sessionsList}>
                  {upcomingSessions.map(session => (
                    <div key={session.id} className={styles.sessionCard}>
                      <div className={styles.sessionCardHeader}>
                        <div className={styles.sessionInfo}>
                          <img src={session.image} alt={session.student} className={styles.sessionAvatar} />
                          <div className={styles.sessionDetails}>
                            <div className={styles.sessionStudent}>{session.student}</div>
                            <div className={styles.sessionMeta}>
                              <span>{formatDate(session.date)} at {session.time}</span>
                              <span>{session.subject}</span>
                              <span>{session.duration}</span>
                              <div className={`${styles.sessionMode} ${session.mode}`}>
                                {session.mode === 'online' ? <Globe size={12} /> : <Users size={12} />}
                                {session.mode === 'online' ? 'Online' : 'In-person'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.sessionStatus}>
                          <span 
                            className={styles.statusBadge}
                            style={{ 
                              backgroundColor: getStatusBadgeBg(session.status),
                              color: getStatusBadgeColor(session.status)
                            }}
                          >
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className={styles.sessionCardActions}>
                        {session.mode === 'online' && session.joinLink && (
                          <button 
                            className={`${styles.sessionActionBtn} ${styles.primary}`}
                            onClick={() => handleJoinSession(session)}
                          >
                            <Play size={14} />
                            Join
                          </button>
                        )}
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => handleRescheduleSession(session)}
                        >
                          <Edit size={14} />
                          Reschedule
                        </button>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => handleMessageStudent(session)}
                        >
                          <MessageCircle size={14} />
                          Message
                        </button>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => handleAddNotes(session)}
                        >
                          <FileText size={14} />
                          Notes
                        </button>
                        <button 
                          className={`${styles.sessionActionBtn} ${styles.danger}`}
                          onClick={() => handleCancelSession(session)}
                        >
                          <X size={14} />
                          Cancel
                        </button>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => openSessionDetails(session)}
                        >
                          <ExternalLink size={14} />
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Sessions */}
            {pastSessions.length > 0 && (
              <div className={styles.sessionsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Past Sessions</h2>
                  <span className={styles.sessionCount}>{pastSessions.length} sessions</span>
                </div>
                <div className={styles.sessionsList}>
                  {pastSessions.map(session => (
                    <div key={session.id} className={styles.sessionCard}>
                      <div className={styles.sessionCardHeader}>
                        <div className={styles.sessionInfo}>
                          <img src={session.image} alt={session.student} className={styles.sessionAvatar} />
                          <div className={styles.sessionDetails}>
                            <div className={styles.sessionStudent}>{session.student}</div>
                            <div className={styles.sessionMeta}>
                              <span>{formatDate(session.date)} at {session.time}</span>
                              <span>{session.subject}</span>
                              <span>{session.duration}</span>
                              <div className={`${styles.sessionMode} ${session.mode}`}>
                                {session.mode === 'online' ? <Globe size={12} /> : <Users size={12} />}
                                {session.mode === 'online' ? 'Online' : 'In-person'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.sessionStatus}>
                          <span 
                            className={styles.statusBadge}
                            style={{ 
                              backgroundColor: getStatusBadgeBg(session.status),
                              color: getStatusBadgeColor(session.status)
                            }}
                          >
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                          <div className={styles.paymentStatus}>
                            <span className={`${styles.paymentBadge} ${session.paymentStatus === 'paid' ? styles.paid : styles.pending}`}>
                              {session.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                          {session.reviewStatus && (
                            <div className={styles.reviewStatus}>
                              <span className={`${styles.reviewBadge} ${session.reviewStatus === 'reviewed' ? styles.reviewed : styles.pending}`}>
                                {session.reviewStatus === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={styles.sessionCardActions}>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => handleMessageStudent(session)}
                        >
                          <MessageCircle size={14} />
                          Message
                        </button>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => handleAddNotes(session)}
                        >
                          <FileText size={14} />
                          Notes
                        </button>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => openSessionDetails(session)}
                        >
                          <ExternalLink size={14} />
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled Sessions */}
            {cancelledSessions.length > 0 && (
              <div className={styles.sessionsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Cancelled Sessions</h2>
                  <span className={styles.sessionCount}>{cancelledSessions.length} sessions</span>
                </div>
                <div className={styles.sessionsList}>
                  {cancelledSessions.map(session => (
                    <div key={session.id} className={styles.sessionCard}>
                      <div className={styles.sessionCardHeader}>
                        <div className={styles.sessionInfo}>
                          <img src={session.image} alt={session.student} className={styles.sessionAvatar} />
                          <div className={styles.sessionDetails}>
                            <div className={styles.sessionStudent}>{session.student}</div>
                            <div className={styles.sessionMeta}>
                              <span>{formatDate(session.date)} at {session.time}</span>
                              <span>{session.subject}</span>
                              <span>{session.duration}</span>
                              <div className={`${styles.sessionMode} ${session.mode}`}>
                                {session.mode === 'online' ? <Globe size={12} /> : <Users size={12} />}
                                {session.mode === 'online' ? 'Online' : 'In-person'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.sessionStatus}>
                          <span 
                            className={styles.statusBadge}
                            style={{ 
                              backgroundColor: getStatusBadgeBg(session.status),
                              color: getStatusBadgeColor(session.status)
                            }}
                          >
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                          {session.cancelReason && (
                            <div className={styles.cancelReason}>
                              <span className={styles.cancelReasonText}>{session.cancelReason}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={styles.sessionCardActions}>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => handleMessageStudent(session)}
                        >
                          <MessageCircle size={14} />
                          Message
                        </button>
                        <button 
                          className={styles.sessionActionBtn}
                          onClick={() => openSessionDetails(session)}
                        >
                          <ExternalLink size={14} />
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredSessions.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>
                  <Calendar size={48} />
                </div>
                <h3 className={styles.emptyStateTitle}>No sessions found</h3>
                <p className={styles.emptyStateText}>
                  Try adjusting your filters or search terms to find sessions.
                </p>
              </div>
            )}
          </div>

          {/* Messages Tab */}
          <div className={`${styles.tabContent} ${activeTab === 'messages' ? styles.active : ''}`}>
            <div className={styles.messagesContainer}>
              {/* Conversations Sidebar */}
              <div className={styles.conversationsSidebar}>
                <div className={styles.conversationsHeader}>
                  <h2 className={styles.conversationsTitle}>Messages</h2>
                  <div className={styles.conversationsSearch}>
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={conversationSearch}
                      onChange={(e) => setConversationSearch(e.target.value)}
                      className={styles.conversationSearchInput}
                    />
                  </div>
                </div>
                
                <div className={styles.conversationsList}>
                  {sortedConversations.map(conversation => (
                    <div
                      key={conversation.id}
                      className={`${styles.conversationItem} ${
                        selectedConversation?.id === conversation.id ? styles.active : ''
                      } ${conversation.isImportant ? styles.important : ''}`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className={styles.conversationAvatar}>
                        <img src={conversation.image} alt={conversation.student} />
                        {conversation.isOnline && <div className={styles.onlineIndicator}></div>}
                      </div>
                      
                      <div className={styles.conversationContent}>
                        <div className={styles.conversationHeader}>
                          <h3 className={styles.conversationName}>
                            {conversation.student}
                            {conversation.isImportant && <Star size={14} className={styles.importantIcon} />}
                          </h3>
                          <span className={styles.conversationTime}>{conversation.lastMessageTime}</span>
                        </div>
                        
                        <div className={styles.conversationMeta}>
                          <span className={styles.conversationSubject}>{conversation.subject}</span>
                          {conversation.unreadCount > 0 && (
                            <span className={styles.unreadBadge}>{conversation.unreadCount}</span>
                          )}
                        </div>
                        
                        <p className={`${styles.conversationPreview} ${conversation.unreadCount > 0 ? styles.unread : ''}`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                      
                      <div className={styles.conversationActions}>
                        <button
                          className={styles.conversationActionBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleImportant(conversation.id);
                          }}
                        >
                          <Star 
                            size={16} 
                            className={conversation.isImportant ? styles.starred : ''}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className={styles.chatWindow}>
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className={styles.chatHeader}>
                      <div className={styles.chatHeaderInfo}>
                        <img src={selectedConversation.image} alt={selectedConversation.student} className={styles.chatAvatar} />
                        <div className={styles.chatHeaderMeta}>
                          <h3 className={styles.chatStudentName}>
                            {selectedConversation.student}
                            {selectedConversation.isOnline && <div className={styles.chatOnlineIndicator}></div>}
                          </h3>
                          <p className={styles.chatSubject}>{selectedConversation.subject}</p>
                        </div>
                      </div>
                      
                      <div className={styles.chatHeaderActions}>
                        <button 
                          className={styles.chatActionBtn}
                          onClick={handleBookSession}
                        >
                          <Calendar size={16} />
                          Book Session
                        </button>
                        <button className={styles.chatActionBtn}>
                          <Phone size={16} />
                          Call
                        </button>
                        <button className={styles.chatActionBtn}>
                          <Video size={16} />
                          Video
                        </button>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className={styles.chatMessages}>
                      {messages[selectedConversation.id]?.map(message => (
                        <div
                          key={message.id}
                          className={`${styles.messageItem} ${
                            message.sender === 'tutor' ? styles.messageOutgoing : styles.messageIncoming
                          }`}
                        >
                          <div className={styles.messageBubble}>
                            <p className={styles.messageText}>{message.message}</p>
                            <div className={styles.messageMeta}>
                              <span className={styles.messageTime}>{message.timestamp}</span>
                              {message.sender === 'tutor' && (
                                <span className={styles.messageStatus}>
                                  {message.isRead ? <CheckCircle size={12} /> : <Check size={12} />}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className={`${styles.messageItem} ${styles.messageIncoming}`}>
                          <div className={styles.typingIndicator}>
                            <div className={styles.typingDot}></div>
                            <div className={styles.typingDot}></div>
                            <div className={styles.typingDot}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className={styles.chatInput}>
                      <div className={styles.chatInputActions}>
                        <button 
                          className={styles.chatInputBtn}
                          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                        >
                          <Paperclip size={20} />
                        </button>
                        
                        {showAttachmentMenu && (
                          <div className={styles.attachmentMenu}>
                            <label className={styles.attachmentOption}>
                              <FileText size={16} />
                              Document
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <label className={styles.attachmentOption}>
                              <Image size={16} />
                              Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                              />
                            </label>
                          </div>
                        )}
                        
                        <button 
                          className={styles.chatInputBtn}
                          onClick={() => setShowTemplates(!showTemplates)}
                        >
                          <MessageSquare size={20} />
                        </button>
                        
                        {showTemplates && (
                          <div className={styles.templatesMenu}>
                            {quickTemplates.map((template, index) => (
                              <button
                                key={index}
                                className={styles.templateOption}
                                onClick={() => handleTemplateSelect(template)}
                              >
                                {template}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.chatInputField}>
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className={styles.messageTextarea}
                          rows={1}
                        />
                        <button 
                          className={styles.sendButton}
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={styles.noChatSelected}>
                    <div className={styles.noChatIcon}>
                      <MessageCircle size={64} />
                    </div>
                    <h3 className={styles.noChatTitle}>Select a conversation</h3>
                    <p className={styles.noChatText}>
                      Choose a conversation from the list to start messaging.
                    </p>
                  </div>
                )}
              </div>
            </div>
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

      {/* Session Details Modal */}
      {showSessionModal && selectedSession && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Session Details</h2>
              <button 
                className={styles.modalClose}
                onClick={() => {
                  setShowSessionModal(false);
                  setSelectedSession(null);
                  setSessionNotes('');
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.sessionDetailInfo}>
                <div className={styles.sessionDetailHeader}>
                  <img src={selectedSession.image} alt={selectedSession.student} className={styles.sessionDetailAvatar} />
                  <div className={styles.sessionDetailMeta}>
                    <h3 className={styles.sessionDetailStudent}>{selectedSession.student}</h3>
                    <p className={styles.sessionDetailSubject}>{selectedSession.subject}</p>
                    <p className={styles.sessionDetailDateTime}>
                      {formatDate(selectedSession.date)} at {selectedSession.time} ({selectedSession.duration})
                    </p>
                    <div className={`${styles.sessionDetailMode} ${selectedSession.mode}`}>
                      {selectedSession.mode === 'online' ? <Globe size={16} /> : <Users size={16} />}
                      {selectedSession.mode === 'online' ? 'Online Session' : 'In-person Session'}
                      {selectedSession.mode === 'online' && selectedSession.joinLink && (
                        <button 
                          className={styles.joinLinkBtn}
                          onClick={() => handleJoinSession(selectedSession)}
                        >
                          Join Meeting
                        </button>
                      )}
                      {selectedSession.mode === 'inperson' && selectedSession.location && (
                        <span className={styles.locationText}>{selectedSession.location}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={styles.sessionDetailContact}>
                  <h4>Contact Information</h4>
                  <p><strong>Email:</strong> {selectedSession.studentEmail}</p>
                  <p><strong>Phone:</strong> {selectedSession.studentPhone}</p>
                </div>
                
                {selectedSession.status === 'past' && (
                  <div className={styles.sessionDetailStatus}>
                    <h4>Session Status</h4>
                    <div className={styles.statusInfo}>
                      <span className={`${styles.paymentBadge} ${selectedSession.paymentStatus === 'paid' ? styles.paid : styles.pending}`}>
                        {selectedSession.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                      </span>
                      {selectedSession.reviewStatus && (
                        <span className={`${styles.reviewBadge} ${selectedSession.reviewStatus === 'reviewed' ? styles.reviewed : styles.pending}`}>
                          {selectedSession.reviewStatus === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                        </span>
                      )}
                      {selectedSession.rating && (
                        <div className={styles.ratingInfo}>
                          <span>Rating: </span>
                          <div className={styles.ratingStars}>
                            {renderStars(selectedSession.rating)}
                          </div>
                        </div>
                      )}
                      {selectedSession.review && (
                        <div className={styles.reviewText}>
                          <strong>Student Review:</strong>
                          <p>{selectedSession.review}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className={styles.sessionDetailNotes}>
                  <h4>Session Notes</h4>
                  <textarea
                    className={styles.notesTextarea}
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Add notes about this session..."
                    rows={6}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.modalBtn}
                onClick={() => {
                  setShowSessionModal(false);
                  setSelectedSession(null);
                  setSessionNotes('');
                }}
              >
                Cancel
              </button>
              <button 
                className={`${styles.modalBtn} ${styles.primary}`}
                onClick={saveSessionNotes}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Session Modal */}
      {showCancelModal && sessionToCancel && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Cancel Session</h2>
              <button 
                className={styles.modalClose}
                onClick={() => {
                  setShowCancelModal(false);
                  setSessionToCancel(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.cancelWarning}>
                <AlertCircle size={48} color="#dc2626" />
                <h3>Are you sure you want to cancel this session?</h3>
                <p>This action cannot be undone. The student will be notified of the cancellation.</p>
                
                <div className={styles.cancelSessionInfo}>
                  <p><strong>Student:</strong> {sessionToCancel.student}</p>
                  <p><strong>Subject:</strong> {sessionToCancel.subject}</p>
                  <p><strong>Date:</strong> {formatDate(sessionToCancel.date)} at {sessionToCancel.time}</p>
                </div>
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.modalBtn}
                onClick={() => {
                  setShowCancelModal(false);
                  setSessionToCancel(null);
                }}
              >
                Keep Session
              </button>
              <button 
                className={`${styles.modalBtn} ${styles.danger}`}
                onClick={confirmCancelSession}
              >
                Cancel Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDashboard; 