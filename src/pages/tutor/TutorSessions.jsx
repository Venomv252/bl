import React, { useState } from 'react';
import { 
  Calendar, 
  Play, 
  Edit, 
  X, 
  MessageCircle, 
  FileText, 
  ExternalLink, 
  Globe, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Star
} from 'lucide-react';
import styles from './TutorSessions.module.css';

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

const TutorSessions = () => {
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

  return (
    <div className={styles.sessionsContainer}>
      <div className={styles.sessionsHeader}>
        <h1 className={styles.sessionsTitle}>Sessions Management</h1>
      </div>
      
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

export default TutorSessions; 