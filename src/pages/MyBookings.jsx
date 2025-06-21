import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyBookings.module.css';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  MessageCircle, 
  X, 
  Star, 
  ExternalLink,
  User,
  BookOpen,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const mockBookings = [
  {
    id: 1,
    date: '2024-07-15',
    time: '16:00',
    tutor: {
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'
    },
    mode: 'online',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'confirmed',
    subject: 'Calculus',
    level: 'Advanced',
    sessionNotes: 'Continue with derivative applications and optimization problems',
    paymentStatus: 'paid',
    amount: 75,
    location: null
  },
  {
    id: 2,
    date: '2024-07-12',
    time: '18:00',
    tutor: {
      name: 'Prof. Michael Chen',
      subject: 'Physics',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    mode: 'offline',
    platform: null,
    meetingLink: null,
    status: 'awaiting',
    subject: 'Quantum Mechanics',
    level: 'Intermediate',
    sessionNotes: 'Introduction to wave functions and probability amplitudes',
    paymentStatus: 'pending',
    amount: 85,
    location: 'San Francisco Public Library, Study Room 3'
  },
  {
    id: 3,
    date: '2024-07-08',
    time: '14:00',
    tutor: {
      name: 'Ms. Emily Rodriguez',
      subject: 'English Literature',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
    },
    mode: 'online',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'completed',
    subject: 'Shakespeare Analysis',
    level: 'Advanced',
    sessionNotes: 'Analysis of Hamlet\'s soliloquy and character development',
    paymentStatus: 'paid',
    amount: 65,
    location: null,
    canReview: true
  },
  {
    id: 4,
    date: '2024-07-05',
    time: '10:00',
    tutor: {
      name: 'Dr. James Wilson',
      subject: 'Chemistry',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
    },
    mode: 'offline',
    platform: null,
    meetingLink: null,
    status: 'cancelled',
    subject: 'Organic Chemistry',
    level: 'Intermediate',
    sessionNotes: 'Reaction mechanisms and stereochemistry',
    paymentStatus: 'refunded',
    amount: 80,
    location: 'Boston University, Chemistry Lab 2'
  }
];

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const getStatusCounts = () => {
    const counts = { upcoming: 0, past: 0, cancelled: 0 };
    mockBookings.forEach(booking => {
      if (booking.status === 'confirmed' || booking.status === 'awaiting') {
        counts.upcoming++;
      } else if (booking.status === 'completed') {
        counts.past++;
      } else if (booking.status === 'cancelled') {
        counts.cancelled++;
      }
    });
    return counts;
  };

  const getFilteredBookings = () => {
    let filtered = mockBookings.filter(booking => {
      // Filter by tab
      if (activeTab === 'upcoming' && !['confirmed', 'awaiting'].includes(booking.status)) return false;
      if (activeTab === 'past' && booking.status !== 'completed') return false;
      if (activeTab === 'cancelled' && booking.status !== 'cancelled') return false;

      // Filter by search
      if (searchQuery && !booking.tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !booking.subject.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // Filter by date
      if (selectedDate && booking.date !== selectedDate) return false;

      return true;
    });

    // Sort by date (upcoming: ascending, past/cancelled: descending)
    filtered.sort((a, b) => {
      if (activeTab === 'upcoming') {
        return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
      } else {
        return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
      }
    });

    return filtered;
  };

  const formatDate = (date, time) => {
    const dateObj = new Date(date + ' ' + time);
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + ' at ' + dateObj.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed': return styles.confirmed;
      case 'awaiting': return styles.awaiting;
      case 'completed': return styles.completed;
      case 'cancelled': return styles.cancelled;
      default: return '';
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleMessageTutor = (tutorName) => {
    // Navigate to messages page with the specific tutor
    navigate('/messages');
  };

  const handleJoinSession = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  const handleReschedule = (booking) => {
    // In a real app, this would open a reschedule form
    alert('Reschedule functionality would open a form to select new date/time');
  };

  const handleCancel = (booking) => {
    if (window.confirm('Are you sure you want to cancel this session?')) {
      // In a real app, this would update the booking status
      alert('Session cancelled successfully');
    }
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    // In a real app, this would submit the review to the backend
    alert('Review submitted successfully!');
    setShowModal(false);
    setRating(0);
    setReview('');
  };

  const statusCounts = getStatusCounts();
  const filteredBookings = getFilteredBookings();

  return (
    <div className={styles.bookingsRoot}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Bookings</h1>
          <p className={styles.pageSubtitle}>Manage your tutoring sessions and track your progress</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'upcoming' ? styles.active : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
              <span className={styles.tabCount}>{statusCounts.upcoming}</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'past' ? styles.active : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past
              <span className={styles.tabCount}>{statusCounts.past}</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'cancelled' ? styles.active : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
              <span className={styles.tabCount}>{statusCounts.cancelled}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search by tutor name or subject..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.dateFilter}>
            <select 
              className={styles.dateSelect}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">All Dates</option>
              {[...new Set(mockBookings.map(b => b.date))].map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className={styles.bookingsGrid}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
              <div key={booking.id} className={styles.bookingCard}>
                <div className={styles.bookingHeader}>
                  <div className={styles.bookingDateTime}>
                    <Calendar size={24} color="#2563eb" />
                    <div className={styles.dateTimeInfo}>
                      <h3>{formatDate(booking.date, booking.time)}</h3>
                      <p>{booking.tutor.subject} • {booking.level}</p>
                    </div>
                  </div>
                  <div className={`${styles.statusBadge} ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status}
                  </div>
                </div>

                <div className={styles.bookingContent}>
                  <div className={styles.tutorInfo}>
                    <img 
                      src={booking.tutor.avatar} 
                      alt={booking.tutor.name} 
                      className={styles.tutorAvatar}
                    />
                    <div className={styles.tutorDetails}>
                      <h4>{booking.tutor.name}</h4>
                      <p>{booking.tutor.subject} Tutor</p>
                    </div>
                  </div>

                  <div className={styles.sessionDetails}>
                    <div className={styles.detailItem}>
                      <strong>Mode:</strong>
                      <span>
                        {booking.mode === 'online' ? (
                          <>
                            <Video size={16} />
                            Online ({booking.platform})
                          </>
                        ) : (
                          <>
                            <MapPin size={16} />
                            Offline
                          </>
                        )}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Payment:</strong>
                      <span>${booking.amount} • {booking.paymentStatus}</span>
                    </div>
                    {booking.location && (
                      <div className={styles.detailItem}>
                        <strong>Location:</strong>
                        <span>{booking.location}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.bookingActions}>
                    <button 
                      className={`${styles.actionBtn} ${styles.secondary}`}
                      onClick={() => handleViewDetails(booking)}
                    >
                      <BookOpen size={16} />
                      View Details
                    </button>
                    
                    {booking.status === 'confirmed' && (
                      <>
                        {booking.mode === 'online' && (
                          <button 
                            className={`${styles.actionBtn} ${styles.success}`}
                            onClick={() => handleJoinSession(booking.meetingLink)}
                          >
                            <ExternalLink size={16} />
                            Join Session
                          </button>
                        )}
                        <button 
                          className={`${styles.actionBtn} ${styles.primary}`}
                          onClick={() => handleMessageTutor(booking.tutor.name)}
                        >
                          <MessageCircle size={16} />
                          Message
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.secondary}`}
                          onClick={() => handleReschedule(booking)}
                        >
                          <Clock size={16} />
                          Reschedule
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.danger}`}
                          onClick={() => handleCancel(booking)}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </>
                    )}

                    {booking.status === 'awaiting' && (
                      <>
                        <button 
                          className={`${styles.actionBtn} ${styles.primary}`}
                          onClick={() => handleMessageTutor(booking.tutor.name)}
                        >
                          <MessageCircle size={16} />
                          Message
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.danger}`}
                          onClick={() => handleCancel(booking)}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </>
                    )}

                    {booking.status === 'completed' && booking.canReview && (
                      <button 
                        className={`${styles.actionBtn} ${styles.primary}`}
                        onClick={() => handleViewDetails(booking)}
                      >
                        <Star size={16} />
                        Add Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <Calendar className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>No bookings found</h3>
              <p className={styles.emptyStateText}>
                {activeTab === 'upcoming' && "You don't have any upcoming sessions. Browse tutors to book your first session!"}
                {activeTab === 'past' && "You haven't completed any sessions yet."}
                {activeTab === 'cancelled' && "You don't have any cancelled sessions."}
              </p>
            </div>
          )}
        </div>

        {/* Booking Details Modal */}
        {showModal && selectedBooking && (
          <div className={styles.modal} onClick={() => setShowModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Booking Details</h2>
                <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.detailSection}>
                  <h4>Session Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Date & Time:</span>
                      <span className={styles.detailValue}>{formatDate(selectedBooking.date, selectedBooking.time)}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Subject:</span>
                      <span className={styles.detailValue}>{selectedBooking.subject}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Level:</span>
                      <span className={styles.detailValue}>{selectedBooking.level}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Mode:</span>
                      <span className={styles.detailValue}>
                        {selectedBooking.mode === 'online' ? `Online (${selectedBooking.platform})` : 'Offline'}
                      </span>
                    </div>
                    {selectedBooking.location && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Location:</span>
                        <span className={styles.detailValue}>{selectedBooking.location}</span>
                      </div>
                    )}
                    {selectedBooking.meetingLink && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Meeting Link:</span>
                        <a 
                          href={selectedBooking.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.meetingLink}
                        >
                          <ExternalLink size={16} />
                          Join Meeting
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h4>Session Notes</h4>
                  <p>{selectedBooking.sessionNotes}</p>
                </div>

                <div className={styles.detailSection}>
                  <h4>Payment Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Amount:</span>
                      <span className={styles.detailValue}>${selectedBooking.amount}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Status:</span>
                      <span className={styles.detailValue}>{selectedBooking.paymentStatus}</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.status === 'completed' && selectedBooking.canReview && (
                  <div className={styles.reviewSection}>
                    <h4>Add a Review</h4>
                    <div className={styles.reviewForm}>
                      <div>
                        <label>Rating:</label>
                        <div className={styles.ratingStars}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={24}
                              className={`${styles.star} ${star <= rating ? styles.filled : ''}`}
                              onClick={() => setRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label>Review:</label>
                        <textarea
                          className={styles.reviewTextarea}
                          placeholder="Share your experience with this tutor..."
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        />
                      </div>
                      <button 
                        className={`${styles.actionBtn} ${styles.primary}`}
                        onClick={handleSubmitReview}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings; 