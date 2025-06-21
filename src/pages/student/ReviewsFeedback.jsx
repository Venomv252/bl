import React, { useState, useEffect } from 'react';
import styles from './ReviewsFeedback.module.css';
import { 
  Star, 
  Edit3, 
  Trash2, 
  Send, 
  X,
  MessageSquare,
  ThumbsUp,
  Clock,
  User
} from 'lucide-react';

const mockPendingReviews = [
  {
    id: 1,
    sessionDate: '2024-07-08',
    sessionTime: '14:00',
    tutor: {
      name: 'Ms. Emily Rodriguez',
      subject: 'English Literature',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
    },
    subject: 'Shakespeare Analysis',
    level: 'Advanced'
  },
  {
    id: 2,
    sessionDate: '2024-07-05',
    sessionTime: '10:00',
    tutor: {
      name: 'Dr. James Wilson',
      subject: 'Chemistry',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
    },
    subject: 'Organic Chemistry',
    level: 'Intermediate'
  }
];

const mockPastReviews = [
  {
    id: 3,
    sessionDate: '2024-06-25',
    sessionTime: '16:00',
    tutor: {
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'
    },
    subject: 'Calculus',
    level: 'Advanced',
    rating: 5,
    comment: 'Dr. Sarah is an excellent tutor! She explained complex calculus concepts in a way that was easy to understand. Her patience and clear explanations helped me grasp difficult topics quickly.',
    isAnonymous: false,
    createdAt: '2024-06-25'
  },
  {
    id: 4,
    sessionDate: '2024-06-20',
    sessionTime: '18:00',
    tutor: {
      name: 'Prof. Michael Chen',
      subject: 'Physics',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    subject: 'Quantum Mechanics',
    level: 'Intermediate',
    rating: 4,
    comment: 'Great session on quantum mechanics. Prof. Chen made the abstract concepts more tangible with real-world examples.',
    isAnonymous: true,
    createdAt: '2024-06-20'
  }
];

const quickPrompts = [
  "Very helpful",
  "Clear explanations",
  "Patient and understanding",
  "Great teaching style",
  "Well organized",
  "Engaging session",
  "Answered all my questions",
  "Would recommend"
];

const ReviewsFeedback = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingReviews, setPendingReviews] = useState(mockPendingReviews);
  const [pastReviews, setPastReviews] = useState(mockPastReviews);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForms, setReviewForms] = useState({});
  const [platformFeedback, setPlatformFeedback] = useState('');

  // Calculate average rating
  const averageRating = pastReviews.length > 0 
    ? (pastReviews.reduce((sum, review) => sum + review.rating, 0) / pastReviews.length).toFixed(1)
    : 0;

  const initializeReviewForm = (reviewId) => {
    if (!reviewForms[reviewId]) {
      setReviewForms(prev => ({
        ...prev,
        [reviewId]: {
          rating: 0,
          comment: '',
          selectedPrompts: [],
          isAnonymous: false
        }
      }));
    }
  };

  const handleStarClick = (reviewId, starValue) => {
    setReviewForms(prev => ({
      ...prev,
      [reviewId]: {
        ...prev[reviewId],
        rating: starValue
      }
    }));
  };

  const handleCommentChange = (reviewId, comment) => {
    setReviewForms(prev => ({
      ...prev,
      [reviewId]: {
        ...prev[reviewId],
        comment
      }
    }));
  };

  const handlePromptClick = (reviewId, prompt) => {
    setReviewForms(prev => {
      const currentPrompts = prev[reviewId]?.selectedPrompts || [];
      const isSelected = currentPrompts.includes(prompt);
      
      return {
        ...prev,
        [reviewId]: {
          ...prev[reviewId],
          selectedPrompts: isSelected 
            ? currentPrompts.filter(p => p !== prompt)
            : [...currentPrompts, prompt]
        }
      };
    });
  };

  const handleAnonymousChange = (reviewId, isAnonymous) => {
    setReviewForms(prev => ({
      ...prev,
      [reviewId]: {
        ...prev[reviewId],
        isAnonymous
      }
    }));
  };

  const handleSubmitReview = (reviewId) => {
    const form = reviewForms[reviewId];
    if (!form || form.rating === 0) {
      alert('Please select a rating before submitting');
      return;
    }

    // In a real app, this would submit to the backend
    alert('Review submitted successfully!');
    
    // Remove from pending and add to past reviews
    const reviewToMove = pendingReviews.find(r => r.id === reviewId);
    if (reviewToMove) {
      const newPastReview = {
        ...reviewToMove,
        rating: form.rating,
        comment: form.comment,
        isAnonymous: form.isAnonymous,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setPastReviews(prev => [newPastReview, ...prev]);
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
      
      // Clear the form
      setReviewForms(prev => {
        const newForms = { ...prev };
        delete newForms[reviewId];
        return newForms;
      });
    }
  };

  const handleEditReview = (reviewId) => {
    const review = pastReviews.find(r => r.id === reviewId);
    if (review) {
      setEditingReview(reviewId);
      setReviewForms(prev => ({
        ...prev,
        [reviewId]: {
          rating: review.rating,
          comment: review.comment,
          selectedPrompts: [],
          isAnonymous: review.isAnonymous
        }
      }));
    }
  };

  const handleUpdateReview = (reviewId) => {
    const form = reviewForms[reviewId];
    if (!form || form.rating === 0) {
      alert('Please select a rating before updating');
      return;
    }

    // In a real app, this would update the backend
    alert('Review updated successfully!');
    
    setPastReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, rating: form.rating, comment: form.comment, isAnonymous: form.isAnonymous }
        : review
    ));
    
    setEditingReview(null);
    setReviewForms(prev => {
      const newForms = { ...prev };
      delete newForms[reviewId];
      return newForms;
    });
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      // In a real app, this would delete from the backend
      alert('Review deleted successfully!');
      setPastReviews(prev => prev.filter(r => r.id !== reviewId));
    }
  };

  const handleCancelEdit = (reviewId) => {
    setEditingReview(null);
    setReviewForms(prev => {
      const newForms = { ...prev };
      delete newForms[reviewId];
      return newForms;
    });
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

  const getCharCount = (text) => {
    return text.length;
  };

  const getCharCountClass = (count) => {
    if (count >= 500) return styles.atLimit;
    if (count >= 400) return styles.nearLimit;
    return '';
  };

  const renderStars = (rating, interactive = false, reviewId = null) => {
    return [1, 2, 3, 4, 5].map(star => (
      <Star
        key={star}
        size={interactive ? 24 : 20}
        className={`${interactive ? styles.interactiveStar : styles.star} ${
          star <= rating ? styles.filled : ''
        }`}
        onClick={interactive ? () => handleStarClick(reviewId, star) : undefined}
      />
    ));
  };

  return (
    <div className={styles.reviewsRoot}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Reviews & Feedback</h1>
          <p className={styles.pageSubtitle}>Share your experience and help other students find great tutors</p>
        </div>

        {/* Summary Section */}
        <div className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Your Review Summary</h2>
          <div className={styles.averageRating}>
            <div className={styles.ratingStars}>
              {renderStars(Math.round(averageRating))}
            </div>
            <div className={styles.averageScore}>{averageRating}</div>
          </div>
          <div className={styles.totalReviews}>
            {pastReviews.length} review{pastReviews.length !== 1 ? 's' : ''} submitted
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'pending' ? styles.active : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Reviews
              <span className={styles.tabCount}>{pendingReviews.length}</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'past' ? styles.active : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Reviews
              <span className={styles.tabCount}>{pastReviews.length}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className={styles.reviewsGrid}>
          {activeTab === 'pending' && (
            pendingReviews.length > 0 ? (
              pendingReviews.map(review => {
                initializeReviewForm(review.id);
                const form = reviewForms[review.id] || { rating: 0, comment: '', selectedPrompts: [], isAnonymous: false };
                const charCount = getCharCount(form.comment);
                
                return (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <img 
                        src={review.tutor.avatar} 
                        alt={review.tutor.name} 
                        className={styles.tutorAvatar}
                      />
                      <div className={styles.sessionInfo}>
                        <div className={styles.sessionDate}>
                          {formatDate(review.sessionDate, review.sessionTime)}
                        </div>
                        <div className={styles.tutorInfo}>
                          {review.tutor.name} • {review.tutor.subject}
                        </div>
                        <div className={styles.subjectInfo}>
                          {review.subject} • {review.level}
                        </div>
                      </div>
                    </div>

                    <div className={styles.reviewContent}>
                      <div className={styles.ratingSection}>
                        <label className={styles.ratingLabel}>Rate your experience:</label>
                        <div className={styles.interactiveStars}>
                          {renderStars(form.rating, true, review.id)}
                        </div>
                      </div>

                      <div className={styles.quickPrompts}>
                        {quickPrompts.map(prompt => (
                          <button
                            key={prompt}
                            className={`${styles.promptTag} ${
                              form.selectedPrompts.includes(prompt) ? styles.selected : ''
                            }`}
                            onClick={() => handlePromptClick(review.id, prompt)}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>

                      <div className={styles.commentSection}>
                        <label className={styles.commentLabel}>Share your experience (optional):</label>
                        <textarea
                          className={styles.commentTextarea}
                          placeholder="Tell us about your session experience..."
                          value={form.comment}
                          onChange={(e) => handleCommentChange(review.id, e.target.value)}
                          maxLength={500}
                        />
                        <div className={`${styles.charCounter} ${getCharCountClass(charCount)}`}>
                          {charCount}/500 characters
                        </div>
                      </div>

                      <div className={styles.anonymousOption}>
                        <input
                          type="checkbox"
                          id={`anonymous-${review.id}`}
                          className={styles.anonymousCheckbox}
                          checked={form.isAnonymous}
                          onChange={(e) => handleAnonymousChange(review.id, e.target.checked)}
                        />
                        <label htmlFor={`anonymous-${review.id}`} className={styles.anonymousLabel}>
                          Submit anonymously
                        </label>
                      </div>

                      <div className={styles.reviewActions}>
                        <button 
                          className={`${styles.submitBtn} ${form.rating === 0 ? styles.disabled : ''}`}
                          onClick={() => handleSubmitReview(review.id)}
                          disabled={form.rating === 0}
                        >
                          <Send size={16} />
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <ThumbsUp className={styles.emptyStateIcon} />
                <h3 className={styles.emptyStateTitle}>No pending reviews</h3>
                <p className={styles.emptyStateText}>
                  You're all caught up! All your completed sessions have been reviewed.
                </p>
              </div>
            )
          )}

          {activeTab === 'past' && (
            pastReviews.length > 0 ? (
              pastReviews.map(review => {
                const isEditing = editingReview === review.id;
                const form = reviewForms[review.id];
                
                return (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <img 
                        src={review.tutor.avatar} 
                        alt={review.tutor.name} 
                        className={styles.tutorAvatar}
                      />
                      <div className={styles.sessionInfo}>
                        <div className={styles.sessionDate}>
                          {formatDate(review.sessionDate, review.sessionTime)}
                        </div>
                        <div className={styles.tutorInfo}>
                          {review.tutor.name} • {review.tutor.subject}
                          {review.isAnonymous && ' (Anonymous)'}
                        </div>
                        <div className={styles.subjectInfo}>
                          {review.subject} • {review.level}
                        </div>
                      </div>
                    </div>

                    <div className={styles.pastReviewContent}>
                      {isEditing ? (
                        <>
                          <div className={styles.ratingSection}>
                            <label className={styles.ratingLabel}>Update your rating:</label>
                            <div className={styles.interactiveStars}>
                              {renderStars(form.rating, true, review.id)}
                            </div>
                          </div>

                          <div className={styles.commentSection}>
                            <label className={styles.commentLabel}>Update your comment:</label>
                            <textarea
                              className={styles.commentTextarea}
                              value={form.comment}
                              onChange={(e) => handleCommentChange(review.id, e.target.value)}
                              maxLength={500}
                            />
                            <div className={`${styles.charCounter} ${getCharCountClass(getCharCount(form.comment))}`}>
                              {getCharCount(form.comment)}/500 characters
                            </div>
                          </div>

                          <div className={styles.reviewActions}>
                            <button 
                              className={styles.submitBtn}
                              onClick={() => handleUpdateReview(review.id)}
                            >
                              <Send size={16} />
                              Update Review
                            </button>
                            <button 
                              className={styles.cancelBtn}
                              onClick={() => handleCancelEdit(review.id)}
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={styles.pastRating}>
                            <span className={styles.pastRatingLabel}>Your Rating:</span>
                            <div className={styles.pastStars}>
                              {renderStars(review.rating)}
                            </div>
                          </div>

                          <div className={styles.pastComment}>
                            {review.comment}
                          </div>

                          <div className={styles.pastActions}>
                            <button 
                              className={styles.editBtn}
                              onClick={() => handleEditReview(review.id)}
                            >
                              <Edit3 size={16} />
                              Edit
                            </button>
                            <button 
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <MessageSquare className={styles.emptyStateIcon} />
                <h3 className={styles.emptyStateTitle}>No reviews yet</h3>
                <p className={styles.emptyStateText}>
                  You haven't submitted any reviews yet. Complete a session to leave your first review!
                </p>
              </div>
            )
          )}
        </div>

        {/* Platform Feedback Section */}
        <div className={styles.feedbackSection}>
          <h3 className={styles.feedbackTitle}>Help us improve BrightLearn</h3>
          <textarea
            className={styles.feedbackTextarea}
            placeholder="Is there anything we can do to improve your experience on BrightLearn? (optional)"
            value={platformFeedback}
            onChange={(e) => setPlatformFeedback(e.target.value)}
            maxLength={1000}
          />
          <div className={styles.charCounter}>
            {platformFeedback.length}/1000 characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsFeedback; 