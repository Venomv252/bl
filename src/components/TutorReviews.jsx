import React, { useState, useMemo } from 'react';
import { Star, ChevronDown, ChevronUp, User, MessageCircle, Flag, Reply } from 'lucide-react';
import styles from '../pages/tutor/TutorDashboard.module.css';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    student: 'Priya S.',
    studentImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    date: '2025-06-10',
    subject: 'Physics',
    text: 'Great explanation style and very patient!',
    reply: ''
  },
  {
    id: 2,
    student: 'Rahul D.',
    studentImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    date: '2025-06-08',
    subject: 'Maths',
    text: 'Very knowledgeable, could improve on punctuality.',
    reply: ''
  },
  {
    id: 3,
    student: 'Aman K.',
    studentImg: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    date: '2025-06-05',
    subject: 'Chemistry',
    text: 'Helped me understand tough concepts easily!',
    reply: 'Thank you Aman!'
  },
  {
    id: 4,
    student: 'Meera T.',
    studentImg: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4,
    date: '2025-06-01',
    subject: 'English',
    text: 'Good tutor, but sometimes sessions start late.',
    reply: ''
  },
  {
    id: 5,
    student: 'Simran P.',
    studentImg: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 3,
    date: '2025-05-28',
    subject: 'Maths',
    text: 'Average experience, but improved my grades.',
    reply: ''
  },
  {
    id: 6,
    student: 'Rohan S.',
    studentImg: 'https://randomuser.me/api/portraits/men/36.jpg',
    rating: 5,
    date: '2025-05-25',
    subject: 'Physics',
    text: 'Best tutor I have had!',
    reply: ''
  }
];

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: '2-digit' });
}

const TutorReviews = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('latest');
  const [expanded, setExpanded] = useState(true);
  const [replying, setReplying] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [reviews, setReviews] = useState(mockReviews);

  // Calculate average rating and breakdown
  const average = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const breakdown = useMemo(() => {
    const map = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => map[r.rating]++);
    return map;
  }, [reviews]);

  // Filtered and sorted reviews
  const filtered = useMemo(() => {
    let arr = [...reviews];
    if (filter !== 'all') arr = arr.filter(r => r.rating === Number(filter));
    if (sort === 'latest') arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === 'highest') arr.sort((a, b) => b.rating - a.rating);
    if (sort === 'lowest') arr.sort((a, b) => a.rating - b.rating);
    return arr;
  }, [reviews, filter, sort]);

  const handleReply = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, reply: replyText } : r));
    setReplying(null);
    setReplyText('');
  };

  return (
    <section className={styles.reviewsSection} style={{ marginBottom: 40 }}>
      {/* Overview */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 12 }}>
          {average} <Star size={32} fill="#fbbf24" color="#fbbf24" style={{ marginBottom: -4 }} />
          <span style={{ color: '#64748b', fontSize: 20, fontWeight: 500, marginLeft: 12 }}>Average Rating</span>
        </div>
        <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>
          Total Reviews: {reviews.length}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {[5,4,3,2,1].map(star => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 700, color: '#1e293b', minWidth: 24 }}>{star} </span>
              <Star size={18} fill="#fbbf24" color="#fbbf24" />
              <div style={{ background: '#f1f5f9', borderRadius: 8, width: 60, height: 10, margin: '0 6px', overflow: 'hidden' }}>
                <div style={{ background: '#fbbf24', width: `${(breakdown[star]/reviews.length)*100||0}%`, height: '100%' }}></div>
              </div>
              <span style={{ color: '#64748b', fontWeight: 500 }}>{breakdown[star]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Sort */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>
          <option value="latest">Latest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
        <button className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#2563eb', fontWeight: 600, border: 'none', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }} onClick={() => setExpanded(v => !v)}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />} {expanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Review List */}
      {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxHeight: 500, overflowY: 'auto' }}>
          {filtered.length === 0 && (
            <div style={{ color: '#64748b', textAlign: 'center', padding: 32 }}>No reviews found.</div>
          )}
          {filtered.map(r => (
            <div key={r.id} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start', position: 'relative' }}>
              <img src={r.studentImg} alt={r.student} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fbbf24' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 18 }}>{r.student}</span>
                  <span style={{ color: '#64748b', fontSize: 15 }}>{formatDate(r.date)}</span>
                  <span style={{ color: '#2563eb', fontWeight: 600, fontSize: 15 }}>{r.subject}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 8 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} fill={i < r.rating ? '#fbbf24' : '#e5e7eb'} color={i < r.rating ? '#fbbf24' : '#e5e7eb'} />
                  ))}
                  <span style={{ marginLeft: 8, color: '#64748b', fontWeight: 500 }}>{r.rating}.0</span>
                </div>
                <div style={{ fontSize: 16, color: '#374151', marginBottom: 8, fontStyle: 'italic' }}>
                  “{r.text}”
                </div>
                {/* Reply Section */}
                {r.reply ? (
                  <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 12, marginTop: 8, color: '#059669', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Reply size={16} /> Tutor reply: {r.reply}
                  </div>
                ) : (
                  <>
                    {replying === r.id ? (
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <input
                          type="text"
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}
                        />
                        <button className={styles.sectionAction} style={{ background: '#059669', color: '#fff', fontWeight: 600, border: 'none', padding: '0.5rem 1rem' }} onClick={() => handleReply(r.id)}>
                          Reply
                        </button>
                        <button className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#dc2626', fontWeight: 600, border: 'none', padding: '0.5rem 1rem' }} onClick={() => setReplying(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#2563eb', fontWeight: 600, border: 'none', padding: '0.5rem 1rem', marginTop: 8 }} onClick={() => { setReplying(r.id); setReplyText(''); }}>
                        <MessageCircle size={16} style={{ marginRight: 6 }} /> Reply
                      </button>
                    )}
                  </>
                )}
              </div>
              <button className={styles.sectionAction} style={{ background: '#fef3c7', color: '#92400e', fontWeight: 600, border: 'none', padding: '0.5rem 1rem', position: 'absolute', right: 24, top: 24 }}>
                <Flag size={16} style={{ marginRight: 6 }} /> Flag
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TutorReviews; 