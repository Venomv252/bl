import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle, ArrowRight, ArrowLeft, BookOpen, GraduationCap, Star, Facebook, Loader2 } from 'lucide-react';
import styles from '../../pages/tutor/TutorDashboard.module.css';

const steps = [
  'Basic Info',
  'Academic Info',
  'Personalize',
  'Welcome'
];

const allSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science', 'Economics'];
const allClubs = ['Robotics', 'Drama', 'Football', 'Music', 'Debate', 'Art', 'Science Club'];

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    studentId: '',
    classYear: '',
    institution: '',
    interests: [],
    clubs: [],
    goals: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // User type selector
  const [userType, setUserType] = useState('student');

  // Progress bar width
  const progress = ((step + 1) / steps.length) * 100;

  // Social login mock
  const handleSocial = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(steps.length - 1);
    }, 1200);
  };

  // Validation for step 0
  const validateStep0 = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name required';
    if (!form.email.trim() && !form.phone.trim()) errs.email = 'Email or phone required';
    if (!form.password) errs.password = 'Password required';
    if (form.password && form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handlers
  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(s => s + 1);
  };
  const handleBack = () => setStep(s => s - 1);
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked ? [...f[name], value] : f[name].filter(v => v !== value) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  const handleSkip = () => setStep(s => s + 1);

  // Submit mock
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(steps.length - 1);
    }, 1200);
  };

  // Renderers for each step
  return (
    <div className={styles.reviewsSection} style={{ maxWidth: 420, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32 }}>
      {/* User type selector */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
        <button
          className={styles.sectionAction}
          style={{
            background: userType === 'student' ? '#2563eb' : '#f1f5f9',
            color: userType === 'student' ? '#fff' : '#2563eb',
            fontWeight: 700,
            border: userType === 'student' ? 'none' : '1px solid #2563eb',
            padding: '0.5rem 1.5rem',
            borderRadius: 8
          }}
          onClick={() => {
            setUserType('student');
            // Stay on this page
          }}
        >
          Sign up as Student
        </button>
        <button
          className={styles.sectionAction}
          style={{
            background: userType === 'tutor' ? '#2563eb' : '#f1f5f9',
            color: userType === 'tutor' ? '#fff' : '#2563eb',
            fontWeight: 700,
            border: userType === 'tutor' ? 'none' : '1px solid #2563eb',
            padding: '0.5rem 1.5rem',
            borderRadius: 8
          }}
          onClick={() => {
            setUserType('tutor');
            navigate('/tutor-signup');
          }}
        >
          Sign up as Tutor
        </button>
      </div>
      {/* Progress Bar */}
      <div style={{ height: 8, background: '#f1f5f9', borderRadius: 8, marginBottom: 32, overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#2563eb', transition: 'width 0.3s' }}></div>
      </div>
      <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 28, marginBottom: 12 }}>Student Sign Up</h2>
      <div style={{ textAlign: 'center', color: '#64748b', marginBottom: 24 }}>{steps[step]}</div>
      {/* Step 0: Basic Info */}
      {step === 0 && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#64748b' }} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{ padding: '0.75rem 0.75rem 0.75rem 2.2rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
                />
              </div>
              {errors.name && <div style={{ color: '#dc2626', fontSize: 13 }}>{errors.name}</div>}
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#64748b' }} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{ padding: '0.75rem 0.75rem 0.75rem 2.2rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
                />
              </div>
              {errors.email && <div style={{ color: '#dc2626', fontSize: 13 }}>{errors.email}</div>}
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Phone (optional)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#64748b' }} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  style={{ padding: '0.75rem 0.75rem 0.75rem 2.2rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
                />
              </div>
              {errors.password && <div style={{ color: '#dc2626', fontSize: 13 }}>{errors.password}</div>}
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#64748b' }} />
                <input
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  style={{ padding: '0.75rem 0.75rem 0.75rem 2.2rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
                />
              </div>
              {errors.confirm && <div style={{ color: '#dc2626', fontSize: 13 }}>{errors.confirm}</div>}
            </div>
            <button type="button" className={styles.sectionAction} style={{ background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: 18, marginTop: 8 }} onClick={handleNext}>
              Next <ArrowRight size={18} style={{ marginLeft: 6 }} />
            </button>
            <div style={{ textAlign: 'center', margin: '16px 0', color: '#64748b' }}>or sign up with</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button type="button" className={styles.sectionAction} style={{ background: '#fff', color: '#2563eb', border: '1px solid #2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => handleSocial('google')}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20, height: 20 }} /> Google
              </button>
              <button type="button" className={styles.sectionAction} style={{ background: '#fff', color: '#1877f3', border: '1px solid #1877f3', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => handleSocial('facebook')}>
                <Facebook size={20} /> Facebook
              </button>
            </div>
          </div>
        </form>
      )}
      {/* Step 1: Academic Info (optional) */}
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600 }}>Student ID / Roll Number</label>
              <input
                type="text"
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID (optional)"
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Class/Year or Major</label>
              <input
                type="text"
                name="classYear"
                value={form.classYear}
                onChange={handleChange}
                placeholder="e.g. 2nd Year, BSc Physics (optional)"
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Institution Name</label>
              <input
                type="text"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                placeholder="Your school/college (optional)"
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="button" className={styles.sectionAction} style={{ background: '#2563eb', color: '#fff', fontWeight: 700, flex: 1 }} onClick={handleNext}>
                Next <ArrowRight size={18} style={{ marginLeft: 6 }} />
              </button>
              <button type="button" className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#2563eb', fontWeight: 700, flex: 1 }} onClick={handleSkip}>
                Skip
              </button>
            </div>
            <button type="button" className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#64748b', fontWeight: 600, marginTop: 0 }} onClick={handleBack}>
              <ArrowLeft size={18} style={{ marginRight: 6 }} /> Back
            </button>
          </div>
        </form>
      )}
      {/* Step 2: Personalize (optional) */}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600 }}>Favorite Subjects</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allSubjects.map(subj => (
                  <label key={subj} style={{ display: 'flex', alignItems: 'center', gap: 4, background: form.interests.includes(subj) ? '#2563eb' : '#f1f5f9', color: form.interests.includes(subj) ? '#fff' : '#374151', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      name="interests"
                      value={subj}
                      checked={form.interests.includes(subj)}
                      onChange={handleChange}
                      style={{ accentColor: '#2563eb', marginRight: 4 }}
                    />
                    <BookOpen size={16} /> {subj}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Clubs / Sports</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allClubs.map(club => (
                  <label key={club} style={{ display: 'flex', alignItems: 'center', gap: 4, background: form.clubs.includes(club) ? '#059669' : '#f1f5f9', color: form.clubs.includes(club) ? '#fff' : '#374151', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      name="clubs"
                      value={club}
                      checked={form.clubs.includes(club)}
                      onChange={handleChange}
                      style={{ accentColor: '#059669', marginRight: 4 }}
                    />
                    <GraduationCap size={16} /> {club}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Study Goals</label>
              <input
                type="text"
                name="goals"
                value={form.goals}
                onChange={handleChange}
                placeholder="e.g. Score 90% in finals, improve in maths..."
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="button" className={styles.sectionAction} style={{ background: '#2563eb', color: '#fff', fontWeight: 700, flex: 1 }} onClick={handleNext}>
                Next <ArrowRight size={18} style={{ marginLeft: 6 }} />
              </button>
              <button type="button" className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#2563eb', fontWeight: 700, flex: 1 }} onClick={handleSkip}>
                Skip
              </button>
            </div>
            <button type="button" className={styles.sectionAction} style={{ background: '#f1f5f9', color: '#64748b', fontWeight: 600, marginTop: 0 }} onClick={handleBack}>
              <ArrowLeft size={18} style={{ marginRight: 6 }} /> Back
            </button>
          </div>
        </form>
      )}
      {/* Step 3: Welcome */}
      {step === 3 && (
        <div style={{ textAlign: 'center', padding: 16 }}>
          <CheckCircle size={48} style={{ color: '#059669', marginBottom: 12 }} />
          <h2 style={{ fontWeight: 800, fontSize: 26, marginBottom: 8 }}>Welcome, {form.name || 'Student'}!</h2>
          <div style={{ color: '#64748b', marginBottom: 16 }}>Your account has been created.</div>
          <div style={{ textAlign: 'left', background: '#f1f5f9', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Summary:</div>
            <div><b>Name:</b> {form.name}</div>
            <div><b>Email:</b> {form.email}</div>
            {form.phone && <div><b>Phone:</b> {form.phone}</div>}
            {form.studentId && <div><b>Student ID:</b> {form.studentId}</div>}
            {form.classYear && <div><b>Class/Year:</b> {form.classYear}</div>}
            {form.institution && <div><b>Institution:</b> {form.institution}</div>}
            {form.interests.length > 0 && <div><b>Interests:</b> {form.interests.join(', ')}</div>}
            {form.clubs.length > 0 && <div><b>Clubs:</b> {form.clubs.join(', ')}</div>}
            {form.goals && <div><b>Goals:</b> {form.goals}</div>}
          </div>
          <div style={{ color: '#374151', fontWeight: 600, marginBottom: 16 }}>Get started:</div>
          <button className={styles.sectionAction} style={{ background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12, width: '100%' }} onClick={() => navigate('/tutors')}>
            <Star size={20} style={{ marginRight: 6 }} /> Find a Tutor
          </button>
          <button className={styles.sectionAction} style={{ background: '#059669', color: '#fff', fontWeight: 700, fontSize: 18, width: '100%' }} onClick={() => navigate('/student-dashboard')}>
            <GraduationCap size={20} style={{ marginRight: 6 }} /> Go to Dashboard
          </button>
        </div>
      )}
      {/* Loading Spinner */}
      {loading && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}>
          <Loader2 size={40} className="spin" style={{ color: '#2563eb' }} />
        </div>
      )}
    </div>
  );
};

export default SignUp; 