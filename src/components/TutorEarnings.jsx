import React, { useState, useMemo } from 'react';
import { DollarSign, Calendar, User, BookOpen, CheckCircle, Clock, Search, Filter, ChevronDown, ChevronUp, CreditCard, Banknote, PieChart, TrendingUp, AlertCircle } from 'lucide-react';
import styles from '../pages/tutor/TutorDashboard.module.css';

// Mock data for earnings and payouts
const mockEarnings = [
  { id: 1, date: '2025-06-22', student: 'Priya', subject: 'Physics', amount: 500, status: 'paid', method: 'UPI', invoice: 'INV-1001' },
  { id: 2, date: '2025-06-21', student: 'Aman', subject: 'Maths', amount: 450, status: 'pending', method: 'Bank', invoice: 'INV-1002' },
  { id: 3, date: '2025-06-20', student: 'Riya', subject: 'Chemistry', amount: 600, status: 'paid', method: 'PayPal', invoice: 'INV-1003' },
  { id: 4, date: '2025-06-18', student: 'Arjun', subject: 'Biology', amount: 400, status: 'paid', method: 'UPI', invoice: 'INV-1004' },
  { id: 5, date: '2025-06-15', student: 'Meera', subject: 'English', amount: 350, status: 'paid', method: 'Bank', invoice: 'INV-1005' },
  { id: 6, date: '2025-06-12', student: 'Kabir', subject: 'Maths', amount: 500, status: 'paid', method: 'UPI', invoice: 'INV-1006' },
  { id: 7, date: '2025-06-10', student: 'Simran', subject: 'Physics', amount: 550, status: 'paid', method: 'PayPal', invoice: 'INV-1007' },
  { id: 8, date: '2025-06-08', student: 'Rohan', subject: 'Maths', amount: 450, status: 'paid', method: 'Bank', invoice: 'INV-1008' },
];

const mockPayouts = [
  { id: 1, date: '2025-06-20', amount: 8000, status: 'completed', method: 'Bank' },
  { id: 2, date: '2025-05-20', amount: 7000, status: 'completed', method: 'UPI' },
  { id: 3, date: '2025-04-20', amount: 6000, status: 'completed', method: 'PayPal' },
];

const nextPayoutDate = '2025-06-28';
const totalEarnings = 50000;
const withdrawable = 10000;

const subjects = [...new Set(mockEarnings.map(e => e.subject))];
const students = [...new Set(mockEarnings.map(e => e.student))];

const statusColors = {
  paid: '#059669',
  pending: '#f59e42',
  completed: '#059669',
};

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: '2-digit' });
}

const TutorEarnings = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [student, setStudent] = useState('all');
  const [subject, setSubject] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showPayouts, setShowPayouts] = useState(false);
  const [withdrawMsg, setWithdrawMsg] = useState('');

  // Filtered earnings
  const filteredEarnings = useMemo(() => {
    return mockEarnings.filter(e => {
      const matchesSearch =
        e.student.toLowerCase().includes(search.toLowerCase()) ||
        e.subject.toLowerCase().includes(search.toLowerCase()) ||
        e.invoice.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' || e.status === status;
      const matchesStudent = student === 'all' || e.student === student;
      const matchesSubject = subject === 'all' || e.subject === subject;
      return matchesSearch && matchesStatus && matchesStudent && matchesSubject;
    });
  }, [search, status, student, subject]);

  // Analytics: earnings by subject
  const earningsBySubject = useMemo(() => {
    const map = {};
    mockEarnings.forEach(e => {
      if (!map[e.subject]) map[e.subject] = 0;
      map[e.subject] += e.amount;
    });
    return map;
  }, []);

  // Analytics: monthly earnings (mocked)
  const monthlyEarnings = [
    { month: 'Feb', amount: 8000 },
    { month: 'Mar', amount: 9000 },
    { month: 'Apr', amount: 12000 },
    { month: 'May', amount: 11000 },
    { month: 'Jun', amount: 10000 },
  ];

  const handleWithdraw = () => {
    setWithdrawMsg('Withdrawal request submitted! Funds will be transferred to your account within 24 hours.');
    setTimeout(() => setWithdrawMsg(''), 4000);
  };

  return (
    <section className={styles.earningsSection} style={{ marginBottom: 40 }}>
      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={{ flex: 1, minWidth: 260 }} className={styles.statCard + ' ' + styles.earnings}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Total Earnings</span>
            <DollarSign size={28} className={styles.statIcon + ' ' + styles.earnings} />
          </div>
          <div className={styles.statValue}>{formatCurrency(totalEarnings)}</div>
        </div>
        <div style={{ flex: 1, minWidth: 260 }} className={styles.statCard + ' ' + styles.earnings}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Withdrawable Balance</span>
            <Banknote size={28} className={styles.statIcon + ' ' + styles.earnings} />
          </div>
          <div className={styles.statValue}>{formatCurrency(withdrawable)}</div>
        </div>
        <div style={{ flex: 1, minWidth: 260 }} className={styles.statCard + ' ' + styles.earnings}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Next Payout Date</span>
            <Calendar size={28} className={styles.statIcon + ' ' + styles.earnings} />
          </div>
          <div className={styles.statValue}>{formatDate(nextPayoutDate)}</div>
        </div>
      </div>

      {/* Withdraw Button */}
      <div style={{ marginBottom: 24 }}>
        <button className={styles.sectionAction} style={{ fontSize: 18, padding: '0.75rem 2.5rem' }} onClick={handleWithdraw}>
          <CreditCard size={22} style={{ marginRight: 8, marginBottom: -3 }} /> Withdraw Funds
        </button>
        {withdrawMsg && (
          <div style={{ color: '#059669', marginTop: 8, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={18} /> {withdrawMsg}
          </div>
        )}
      </div>

      {/* Earnings Table & Filters */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24, marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Earnings History</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 10, top: 10, color: '#64748b' }} />
              <input
                type="text"
                placeholder="Search by student, subject, invoice..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ padding: '0.5rem 0.5rem 0.5rem 2rem', borderRadius: 8, border: '1px solid #e2e8f0', minWidth: 200 }}
              />
            </div>
            <button className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#2563eb', fontWeight: 600, border: 'none', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }} onClick={() => setShowFilters(v => !v)}>
              <Filter size={18} style={{ marginRight: 6 }} /> Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
        {showFilters && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
            <select value={student} onChange={e => setStudent(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <option value="all">All Students</option>
              {students.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={subject} onChange={e => setSubject(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <option value="all">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Subject</th>
                <th style={{ padding: 12, textAlign: 'right' }}>Amount</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Status</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Method/Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredEarnings.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: '#64748b' }}>No transactions found.</td>
                </tr>
              )}
              {filteredEarnings.map(e => (
                <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: 12 }}>{formatDate(e.date)}</td>
                  <td style={{ padding: 12 }}>{e.student}</td>
                  <td style={{ padding: 12 }}>{e.subject}</td>
                  <td style={{ padding: 12, textAlign: 'right', fontWeight: 600 }}>{formatCurrency(e.amount)}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <span style={{ background: statusColors[e.status], color: '#fff', borderRadius: 8, padding: '2px 12px', fontWeight: 600, fontSize: 13 }}>
                      {e.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: 12, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
                    {e.method} <span style={{ color: '#cbd5e1', margin: '0 6px' }}>|</span> {e.invoice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout History */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24, marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Payout History</h3>
          <button className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#059669', fontWeight: 600, border: 'none', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }} onClick={() => setShowPayouts(v => !v)}>
            {showPayouts ? <ChevronUp size={16} /> : <ChevronDown size={16} />} {showPayouts ? 'Hide' : 'Show'}
          </button>
        </div>
        {showPayouts && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#64748b', fontWeight: 600 }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
                  <th style={{ padding: 12, textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: 12, textAlign: 'center' }}>Status</th>
                  <th style={{ padding: 12, textAlign: 'center' }}>Method</th>
                </tr>
              </thead>
              <tbody>
                {mockPayouts.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: 12 }}>{formatDate(p.date)}</td>
                    <td style={{ padding: 12, textAlign: 'right', fontWeight: 600 }}>{formatCurrency(p.amount)}</td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <span style={{ background: statusColors[p.status], color: '#fff', borderRadius: 8, padding: '2px 12px', fontWeight: 600, fontSize: 13 }}>
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: 12, textAlign: 'center', color: '#64748b', fontSize: 13 }}>{p.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payout Method Link */}
      <div style={{ marginBottom: 32 }}>
        <a href="#" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline', fontSize: 16 }}>
          Set or Edit Payout Method
        </a>
      </div>

      {/* Analytics (Optional) */}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <TrendingUp size={20} style={{ color: '#2563eb' }} />
            <span style={{ fontWeight: 700, color: '#1e293b' }}>Earnings Over Time</span>
          </div>
          <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            {monthlyEarnings.map((m, i) => (
              <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: m.amount / 120, width: 24, background: '#2563eb', borderRadius: 6, marginBottom: 4, transition: 'height 0.3s' }}></div>
                <span style={{ fontSize: 13, color: '#64748b' }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <PieChart size={20} style={{ color: '#059669' }} />
            <span style={{ fontWeight: 700, color: '#1e293b' }}>Top Subjects</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Object.entries(earningsBySubject).map(([subj, amt]) => (
              <li key={subj} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#64748b', fontWeight: 500 }}>{subj}</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>{formatCurrency(amt)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notifications & Alerts */}
      <div style={{ background: '#fef3c7', color: '#92400e', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500, fontSize: 15 }}>
        <AlertCircle size={20} style={{ color: '#f59e42' }} />
        Earnings are credited after each session is marked as completed. You will be notified when a new payment is processed.
      </div>
    </section>
  );
};

export default TutorEarnings; 