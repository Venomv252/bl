import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, User, GraduationCap, Eye, EyeOff, Lock, Mail as MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import styles from './SignUp.module.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(`Account created successfully! Welcome to BrightLearn, ${data.firstName}!`);
      navigate('/login');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className={styles.signupSection}>
      <div className="container">
        <div className={styles.signupContainer}>
          <div className={styles.signupHeader}>
            <div className={styles.logo}>
              <BookOpen className="logo-icon" />
              <span>BrightLearn</span>
            </div>
            <h2>Create Your Account</h2>
            <p>Join our community and start your learning journey</p>
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
          <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  type="text"
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  type="text"
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
              </div>
            </div>
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
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  placeholder="Create a password"
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
            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <div className={styles.inputGroup}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
            </div>
            {userType === 'tutor' && (
              <div className={styles.formGroup}>
                <label>Subject Expertise</label>
                <select {...register("subject", { required: "Please select your subject" })}>
                  <option value="">Select your primary subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English Literature">English Literature</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="History">History</option>
                  <option value="Biology">Biology</option>
                  <option value="Economics">Economics</option>
                </select>
                {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
              </div>
            )}
            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  {...register("terms", { required: "You must accept the terms and conditions" })}
                />
                <span>I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></span>
              </label>
              {errors.terms && <span className={styles.error}>{errors.terms.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-large" disabled={isLoading}>
              {isLoading ? 'Creating account...' : `Sign up as ${userType}`}
            </button>
          </form>
          <div className={styles.signupFooter}>
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp; 