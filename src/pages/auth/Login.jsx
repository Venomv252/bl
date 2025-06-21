import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, User, GraduationCap, Eye, EyeOff, Lock, Mail as MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import styles from './Login.module.css';

const mockUsers = {
  students: [
    { email: 'student@example.com', password: 'password123', name: 'Alex Johnson', type: 'student' },
    { email: 'john@example.com', password: 'password123', name: 'John Smith', type: 'student' }
  ],
  tutors: [
    { email: 'tutor@example.com', password: 'password123', name: 'Dr. Sarah Johnson', type: 'tutor' },
    { email: 'michael@example.com', password: 'password123', name: 'Prof. Michael Chen', type: 'tutor' }
  ]
};

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      const users = userType === 'student' ? mockUsers.students : mockUsers.tutors;
      const user = users.find(u => u.email === data.email && u.password === data.password);
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.type === 'student') {
          navigate('/student-dashboard');
        } else if (user.type === 'tutor') {
          navigate('/tutor-dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className={styles.loginSection}>
      <div className="container">
        <div className={styles.loginContainer}>
          <div className={styles.loginHeader}>
            <div className={styles.logo}>
              <BookOpen className="logo-icon" />
              <span>BrightLearn</span>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue your learning journey</p>
          </div>
          <div className={styles.userTypeSelector}>
            <button 
              className={`${styles.typeBtn} ${userType === 'student' ? styles.typeBtnActive : ''}`}
              onClick={() => setUserType('student')}
            >
              <User size={20} />
              Student
            </button>
            <button 
              className={`${styles.typeBtn} ${userType === 'tutor' ? styles.typeBtnActive : ''}`}
              onClick={() => setUserType('tutor')}
            >
              <GraduationCap size={20} />
              Tutor
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <div className={styles.inputGroup}>
                <MailIcon size={20} className={styles.inputIcon} />
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <div className={styles.inputGroup}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>
            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <button type="submit" className="btn btn-primary btn-large" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className={styles.loginFooter}>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <div className={styles.demoCredentials}>
              <h4>Demo Credentials:</h4>
              <div className={styles.credentialGroup}>
                <strong>Student:</strong> student@example.com / password123
              </div>
              <div className={styles.credentialGroup}>
                <strong>Tutor:</strong> tutor@example.com / password123
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login; 