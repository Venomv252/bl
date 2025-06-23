import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle, ArrowRight, ArrowLeft, BookOpen, GraduationCap, Star, Facebook, Loader2, Upload, FileText, Video, Globe, Users, DollarSign, Calendar, Image } from 'lucide-react';
import styles from '../../pages/tutor/TutorDashboard.module.css';

const steps = [
  'Basic Info',
  'Teaching Details',
  'Availability & Pricing',
  'Verification',
  'Review & Submit'
];

const allSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science', 'Economics'];
const allGrades = ['Elementary', 'Middle School', 'High School', 'College', 'Adult'];
const allLanguages = ['English', 'Spanish', 'Hindi', 'French', 'German', 'Mandarin'];
const allModes = ['Online', 'In-person'];

const TutorSignUp = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    profilePic: '',
    subjects: [],
    qualifications: '',
    experience: '',
    gradeLevels: [],
    languages: [],
    slots: '',
    mode: [],
    hourlyRate: '',
    trial: false,
    idFile: '',
    resume: '',
    video: '',
    portfolio: '',
    agree: false
  });
  const [errors, setErrors] = useState({});
  const [previewPic, setPreviewPic] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [userType, setUserType] = useState('tutor');

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
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox' && name !== 'agree') {
      setForm(f => ({ ...f, [name]: checked ? [...f[name], value] : f[name].filter(v => v !== value) }));
    } else if (type === 'checkbox' && name === 'agree') {
      setForm(f => ({ ...f, agree: checked }));
    } else if (type === 'file') {
      const file = files[0];
      if (file) {
        setForm(f => ({ ...f, [name]: file }));
        if (name === 'profilePic') {
          const reader = new FileReader();
          reader.onload = e => setPreviewPic(e.target.result);
          reader.readAsDataURL(file);
        }
      }
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
    <div className={styles.reviewsSection} style={{ maxWidth: 480, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, position: 'relative' }}>
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
            navigate('/signup');
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
            // Stay on this page
          }}
        >
          Sign up as Tutor
        </button>
      </div>
      {/* Progress Bar */}
      <div style={{ height: 8, background: '#f1f5f9', borderRadius: 8, marginBottom: 32, overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#2563eb', transition: 'width 0.3s' }}></div>
      </div>
      <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 28, marginBottom: 12 }}>Tutor Sign Up</h2>
      <div style={{ textAlign: 'center', color: '#64748b', marginBottom: 24 }}>{steps[step]}</div>
      {/* Step 0: Basic Info */}
      {step === 0 && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              <div style={{ margin: '0 auto 12px' }}>
                <button type="button" style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
                  {previewPic ? (
                    <img src={previewPic} alt="Profile" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }} />
                  ) : (
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #e2e8f0' }}>
                      <Image size={32} color="#64748b" />
                    </div>
                  )}
                </button>
                <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Add profile picture (optional)</div>
              </div>
            </div>
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
      {/* Step 1: Teaching Details */}
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600 }}>Subjects You Can Teach</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allSubjects.map(subj => (
                  <label key={subj} style={{ display: 'flex', alignItems: 'center', gap: 4, background: form.subjects.includes(subj) ? '#2563eb' : '#f1f5f9', color: form.subjects.includes(subj) ? '#fff' : '#374151', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      name="subjects"
                      value={subj}
                      checked={form.subjects.includes(subj)}
                      onChange={handleChange}
                      style={{ accentColor: '#2563eb', marginRight: 4 }}
                    />
                    <BookOpen size={16} /> {subj}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Educational Qualifications</label>
              <input
                type="text"
                name="qualifications"
                value={form.qualifications}
                onChange={handleChange}
                placeholder="e.g. MSc Mathematics, BEd, PhD..."
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. 5"
                min={0}
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Preferred Grade Levels</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allGrades.map(grade => (
                  <label key={grade} style={{ display: 'flex', alignItems: 'center', gap: 4, background: form.gradeLevels.includes(grade) ? '#059669' : '#f1f5f9', color: form.gradeLevels.includes(grade) ? '#fff' : '#374151', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      name="gradeLevels"
                      value={grade}
                      checked={form.gradeLevels.includes(grade)}
                      onChange={handleChange}
                      style={{ accentColor: '#059669', marginRight: 4 }}
                    />
                    <GraduationCap size={16} /> {grade}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Languages You Teach In</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allLanguages.map(lang => (
                  <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: 4, background: form.languages.includes(lang) ? '#fbbf24' : '#f1f5f9', color: form.languages.includes(lang) ? '#fff' : '#374151', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      name="languages"
                      value={lang}
                      checked={form.languages.includes(lang)}
                      onChange={handleChange}
                      style={{ accentColor: '#fbbf24', marginRight: 4 }}
                    />
                    <Globe size={16} /> {lang}
                  </label>
                ))}
              </div>
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
      {/* Step 2: Availability & Pricing */}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600 }}>Weekly Available Time Slots</label>
              <input
                type="text"
                name="slots"
                value={form.slots}
                onChange={handleChange}
                placeholder="e.g. Mon-Fri 4-8pm, Sat 10am-2pm"
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>You can edit this later in your dashboard.</div>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Mode of Teaching</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {allModes.map(mode => (
                  <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: 4, background: form.mode.includes(mode) ? '#2563eb' : '#f1f5f9', color: form.mode.includes(mode) ? '#fff' : '#374151', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      name="mode"
                      value={mode}
                      checked={form.mode.includes(mode)}
                      onChange={handleChange}
                      style={{ accentColor: '#2563eb', marginRight: 4 }}
                    />
                    {mode === 'Online' ? <Globe size={16} /> : <Users size={16} />} {mode}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Hourly Rate (₹)</label>
              <input
                type="number"
                name="hourlyRate"
                value={form.hourlyRate}
                onChange={handleChange}
                placeholder="e.g. 500"
                min={0}
                style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                name="trial"
                checked={form.trial}
                onChange={handleChange}
                style={{ accentColor: '#059669' }}
              />
              <span style={{ color: '#374151', fontWeight: 500 }}>Offer a free trial session</span>
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
      {/* Step 3: Verification & Documents */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600 }}>Upload Photo ID (optional)</label>
              <input type="file" name="idFile" accept="image/*,application/pdf" onChange={handleChange} style={{ marginBottom: 8 }} />
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Upload Resume/CV (optional)</label>
              <input type="file" name="resume" accept="application/pdf" onChange={handleChange} style={{ marginBottom: 8 }} />
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>Demo Video or Portfolio Link (optional)</label>
              <input
                type="url"
                name="video"
                value={form.video}
                onChange={handleChange}
                placeholder="Paste video or portfolio link"
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
      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div style={{ textAlign: 'center', padding: 16 }}>
          <CheckCircle size={48} style={{ color: '#059669', marginBottom: 12 }} />
          <h2 style={{ fontWeight: 800, fontSize: 26, marginBottom: 8 }}>Welcome, {form.name || 'Tutor'}!</h2>
          <div style={{ color: '#64748b', marginBottom: 16 }}>Your profile will be reviewed within 24 hours. Once approved, you'll appear in search results and can start teaching!</div>
          <div style={{ textAlign: 'left', background: '#f1f5f9', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Profile Preview:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              {previewPic ? (
                <img src={previewPic} alt="Profile" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }} />
              ) : (
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #e2e8f0' }}>
                  <Image size={24} color="#64748b" />
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, color: '#1e293b' }}>{form.name}</div>
                <div style={{ color: '#64748b', fontSize: 15 }}>{form.email}</div>
              </div>
            </div>
            {form.subjects.length > 0 && <div><b>Subjects:</b> {form.subjects.join(', ')}</div>}
            {form.qualifications && <div><b>Qualifications:</b> {form.qualifications}</div>}
            {form.experience && <div><b>Experience:</b> {form.experience} years</div>}
            {form.gradeLevels.length > 0 && <div><b>Grade Levels:</b> {form.gradeLevels.join(', ')}</div>}
            {form.languages.length > 0 && <div><b>Languages:</b> {form.languages.join(', ')}</div>}
            {form.slots && <div><b>Availability:</b> {form.slots}</div>}
            {form.mode.length > 0 && <div><b>Mode:</b> {form.mode.join(', ')}</div>}
            {form.hourlyRate && <div><b>Hourly Rate:</b> ₹{form.hourlyRate}</div>}
            {form.trial && <div><b>Trial Session:</b> Yes</div>}
            {form.video && <div><b>Demo/Portfolio:</b> <a href={form.video} target="_blank" rel="noopener noreferrer">View</a></div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, justifyContent: 'center' }}>
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} style={{ accentColor: '#2563eb' }} />
            <span style={{ color: '#374151', fontWeight: 500 }}>I agree to the <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Terms & Conditions</a></span>
          </div>
          <button className={styles.sectionAction} style={{ background: form.agree ? '#2563eb' : '#cbd5e1', color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12, width: '100%' }} disabled={!form.agree} onClick={() => navigate('/tutor-dashboard')}>
            <Star size={20} style={{ marginRight: 6 }} /> Create Account
          </button>
          <button className={styles.sectionAction} style={{ background: '#059669', color: '#fff', fontWeight: 700, fontSize: 18, width: '100%' }} onClick={() => navigate('/tutors')}>
            <GraduationCap size={20} style={{ marginRight: 6 }} /> Preview as Student
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

export default TutorSignUp; 