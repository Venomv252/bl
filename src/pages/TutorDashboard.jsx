import React from 'react';

const TutorDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 8px 32px 0 rgba(30,41,59,0.10)', padding: '3rem', maxWidth: 500, width: '100%', textAlign: 'center' }}>
        <h1 style={{ color: '#2563eb', fontWeight: 800, marginBottom: '1rem' }}>Welcome, {user?.name || 'Tutor'}!</h1>
        <p style={{ color: '#64748b', fontSize: '1.15rem', marginBottom: '2rem' }}>
          This is your tutor dashboard. Here you will be able to manage your students, sessions, and more features coming soon!
        </p>
        <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          <em>Dashboard features will appear here as the platform grows.</em>
        </div>
      </div>
    </section>
  );
};

export default TutorDashboard; 