import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { BookOpen, Users, Award, Clock, Star, ArrowRight, Menu, X, GraduationCap, Code, Palette, Globe, Calculator, Search, Filter, DollarSign, Calendar, MapPin, Phone, Mail, CreditCard, CheckCircle, User, BookMarked, Languages, Brain, Eye, EyeOff, Lock, Mail as MailIcon } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import './App.css'
import About from './About'
import TutorsList from './components/TutorsList'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import StudentDashboard from './pages/StudentDashboard'
import TutorDashboard from './pages/TutorDashboard'

// Mock data for tutors
const tutorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    subjects: ["Algebra", "Calculus", "Statistics", "Geometry"],
    experience: "8 years",
    education: "PhD in Mathematics, MIT",
    rating: 4.9,
    students: 156,
    hourlyRate: 75,
    location: "New York, NY",
    availability: "Mon-Fri, 9AM-6PM",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    bio: "Experienced mathematics educator with a passion for making complex concepts accessible. Specializes in helping students build strong foundational skills.",
    languages: ["English", "Spanish"],
    certifications: ["Certified Math Teacher", "Advanced Calculus Specialist"],
    enrollmentFee: 150
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Physics",
    subjects: ["Mechanics", "Thermodynamics", "Electromagnetism", "Quantum Physics"],
    experience: "12 years",
    education: "PhD in Physics, Stanford University",
    rating: 4.8,
    students: 203,
    hourlyRate: 85,
    location: "San Francisco, CA",
    availability: "Mon-Sat, 10AM-8PM",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Award-winning physics professor with expertise in both theoretical and experimental physics. Committed to fostering scientific curiosity.",
    languages: ["English", "Mandarin"],
    certifications: ["Physics Teaching Certification", "Research Excellence Award"],
    enrollmentFee: 200
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    subject: "English Literature",
    subjects: ["Creative Writing", "Shakespeare", "Modern Literature", "Essay Writing"],
    experience: "6 years",
    education: "MA in English Literature, Columbia University",
    rating: 4.7,
    students: 89,
    hourlyRate: 65,
    location: "Los Angeles, CA",
    availability: "Tue-Sun, 2PM-10PM",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Passionate literature teacher who believes in the power of storytelling. Helps students develop critical thinking and analytical skills.",
    languages: ["English", "Spanish"],
    certifications: ["English Teaching Certification", "Creative Writing Workshop Leader"],
    enrollmentFee: 120
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    subject: "Chemistry",
    subjects: ["Organic Chemistry", "Inorganic Chemistry", "Biochemistry", "Analytical Chemistry"],
    experience: "10 years",
    education: "PhD in Chemistry, UC Berkeley",
    rating: 4.9,
    students: 178,
    hourlyRate: 80,
    location: "Boston, MA",
    availability: "Mon-Fri, 8AM-5PM",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Research chemist turned educator with a talent for explaining complex chemical concepts in simple terms.",
    languages: ["English"],
    certifications: ["Chemistry Teaching License", "Laboratory Safety Certification"],
    enrollmentFee: 180
  },
  {
    id: 5,
    name: "Ms. Lisa Thompson",
    subject: "Computer Science",
    subjects: ["Python", "JavaScript", "Data Structures", "Web Development"],
    experience: "7 years",
    education: "MS in Computer Science, Georgia Tech",
    rating: 4.6,
    students: 134,
    hourlyRate: 70,
    location: "Seattle, WA",
    availability: "Mon-Sat, 11AM-9PM",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    bio: "Former software engineer with a passion for teaching programming. Specializes in making coding accessible to beginners.",
    languages: ["English"],
    certifications: ["Software Engineering Certification", "Web Development Specialist"],
    enrollmentFee: 140
  },
  {
    id: 6,
    name: "Prof. David Kim",
    subject: "History",
    subjects: ["World History", "American History", "European History", "Asian History"],
    experience: "15 years",
    education: "PhD in History, Harvard University",
    rating: 4.8,
    students: 167,
    hourlyRate: 75,
    location: "Chicago, IL",
    availability: "Mon-Fri, 9AM-7PM",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    bio: "Distinguished history professor with expertise in multiple historical periods. Makes history engaging and relevant to modern students.",
    languages: ["English", "Korean"],
    certifications: ["History Teaching License", "Academic Excellence Award"],
    enrollmentFee: 160
  }
]

// Mock user data
const mockUsers = {
  students: [
    { email: 'student@example.com', password: 'password123', name: 'Alex Johnson', type: 'student' },
    { email: 'john@example.com', password: 'password123', name: 'John Smith', type: 'student' }
  ],
  tutors: [
    { email: 'tutor@example.com', password: 'password123', name: 'Dr. Sarah Johnson', type: 'tutor' },
    { email: 'michael@example.com', password: 'password123', name: 'Prof. Michael Chen', type: 'tutor' }
  ]
}

// Components
const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Find Your Perfect <span className="highlight">Personal Tutor</span></h1>
          <p>Connect with expert tutors in your area. Get personalized one-on-one instruction to excel in any subject. Start your learning journey today.</p>
          <div className="hero-stats">
            <div className="stat">
              <Users className="stat-icon" />
              <div>
                <h3>500+</h3>
                <p>Expert Tutors</p>
              </div>
            </div>
            <div className="stat">
              <BookOpen className="stat-icon" />
              <div>
                <h3>50+</h3>
                <p>Subjects</p>
              </div>
            </div>
            <div className="stat">
              <Award className="stat-icon" />
              <div>
                <h3>10K+</h3>
                <p>Students Helped</p>
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/tutors" className="btn btn-primary btn-large">
              Find a Tutor
              <ArrowRight className="btn-icon" />
            </Link>
            <button className="btn btn-outline btn-large">Become a Tutor</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card">
            <div className="card-header">
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Student" />
              </div>
              <div>
                <h4>Alex Johnson</h4>
                <p>Mathematics Student</p>
              </div>
            </div>
            <div className="card-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '85%'}}></div>
              </div>
              <p>85% Grade Improvement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate()

  return (
    <div className="tutor-card">
      <div className="tutor-image">
        <img src={tutor.image} alt={tutor.name} />
        <div className="tutor-overlay">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/tutor/${tutor.id}`)}
          >
            View Profile
          </button>
        </div>
      </div>
      <div className="tutor-content">
        <div className="tutor-header">
          <h3>{tutor.name}</h3>
          <div className="tutor-rating">
            <Star className="star-icon" />
            <span>{tutor.rating}</span>
          </div>
        </div>
        <p className="tutor-subject">{tutor.subject}</p>
        <div className="tutor-meta">
          <span><Clock size={16} /> {tutor.experience} exp</span>
          <span><Users size={16} /> {tutor.students} students</span>
          <span><DollarSign size={16} /> ${tutor.hourlyRate}/hr</span>
        </div>
        <div className="tutor-location">
          <MapPin size={16} />
          <span>{tutor.location}</span>
        </div>
        <div className="tutor-footer">
          <span className="enrollment-fee">Enrollment: ${tutor.enrollmentFee}</span>
          <button 
            className="btn btn-outline"
            onClick={() => navigate(`/tutor/${tutor.id}`)}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

const TutorProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEnrolling, setIsEnrolling] = useState(false)
  
  const tutor = tutorsData.find(t => t.id === parseInt(id))
  
  if (!tutor) {
    return <div className="container">Tutor not found</div>
  }

  const handleEnrollment = () => {
    setIsEnrolling(true)
    toast.success('Redirecting to payment...')
    setTimeout(() => {
      navigate(`/payment/${tutor.id}`)
    }, 1500)
  }

  return (
    <section className="tutor-profile">
      <div className="container">
        <div className="profile-header">
          <div className="profile-image">
            <img src={tutor.image} alt={tutor.name} />
          </div>
          <div className="profile-info">
            <h1>{tutor.name}</h1>
            <p className="subject">{tutor.subject} Tutor</p>
            <div className="profile-stats">
              <div className="stat">
                <Star className="stat-icon" />
                <div>
                  <h3>{tutor.rating}</h3>
                  <p>Rating</p>
                </div>
              </div>
              <div className="stat">
                <Users className="stat-icon" />
                <div>
                  <h3>{tutor.students}</h3>
                  <p>Students</p>
                </div>
              </div>
              <div className="stat">
                <Clock className="stat-icon" />
                <div>
                  <h3>{tutor.experience}</h3>
                  <p>Experience</p>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn btn-primary btn-large" onClick={handleEnrollment}>
                Enroll Now - ${tutor.enrollmentFee}
              </button>
              <button className="btn btn-outline btn-large">
                <Phone size={20} />
                Contact
              </button>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="details-grid">
            <div className="detail-section">
              <h3>About {tutor.name}</h3>
              <p>{tutor.bio}</p>
            </div>
            
            <div className="detail-section">
              <h3>Education & Experience</h3>
              <div className="detail-item">
                <strong>Education:</strong> {tutor.education}
              </div>
              <div className="detail-item">
                <strong>Experience:</strong> {tutor.experience}
              </div>
              <div className="detail-item">
                <strong>Location:</strong> {tutor.location}
              </div>
              <div className="detail-item">
                <strong>Availability:</strong> {tutor.availability}
              </div>
            </div>

            <div className="detail-section">
              <h3>Subjects Taught</h3>
              <div className="subjects-list">
                {tutor.subjects.map(subject => (
                  <span key={subject} className="subject-tag">{subject}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Languages</h3>
              <div className="languages-list">
                {tutor.languages.map(language => (
                  <span key={language} className="language-tag">{language}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Certifications</h3>
              <ul className="certifications-list">
                {tutor.certifications.map(cert => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section pricing">
              <h3>Pricing & Enrollment</h3>
              <div className="pricing-card">
                <div className="price-item">
                  <span>Hourly Rate:</span>
                  <span className="price">${tutor.hourlyRate}/hour</span>
                </div>
                <div className="price-item">
                  <span>Enrollment Fee:</span>
                  <span className="price">${tutor.enrollmentFee}</span>
                </div>
                <div className="price-item total">
                  <span>Total to Start:</span>
                  <span className="price">${tutor.enrollmentFee}</span>
                </div>
                <button className="btn btn-primary btn-large" onClick={handleEnrollment}>
                  <CreditCard size={20} />
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PaymentForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const tutor = tutorsData.find(t => t.id === parseInt(id))
  
  if (!tutor) {
    return <div className="container">Tutor not found</div>
  }

  const onSubmit = (data) => {
    toast.success('Payment processed successfully!')
    setTimeout(() => {
      navigate('/success')
    }, 2000)
  }

  return (
    <section className="payment-section">
      <div className="container">
        <div className="payment-header">
          <h2>Complete Your Enrollment</h2>
          <p>You're enrolling with {tutor.name} for {tutor.subject}</p>
        </div>

        <div className="payment-content">
          <div className="payment-summary">
            <h3>Enrollment Summary</h3>
            <div className="summary-item">
              <span>Tutor:</span>
              <span>{tutor.name}</span>
            </div>
            <div className="summary-item">
              <span>Subject:</span>
              <span>{tutor.subject}</span>
            </div>
            <div className="summary-item">
              <span>Enrollment Fee:</span>
              <span>${tutor.enrollmentFee}</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>${tutor.enrollmentFee}</span>
            </div>
          </div>

          <div className="payment-form">
            <h3>Payment Information</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error">{errors.fullName.message}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
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
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone number is required" })}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  {...register("cardNumber", { 
                    required: "Card number is required",
                    pattern: {
                      value: /^\d{16}$/,
                      message: "Please enter a valid 16-digit card number"
                    }
                  })}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && <span className="error">{errors.cardNumber.message}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    {...register("expiry", { 
                      required: "Expiry date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: "Please enter in MM/YY format"
                      }
                    })}
                    placeholder="MM/YY"
                  />
                  {errors.expiry && <span className="error">{errors.expiry.message}</span>}
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    {...register("cvv", { 
                      required: "CVV is required",
                      pattern: {
                        value: /^\d{3,4}$/,
                        message: "Please enter a valid CVV"
                      }
                    })}
                    placeholder="123"
                  />
                  {errors.cvv && <span className="error">{errors.cvv.message}</span>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                <CreditCard size={20} />
                Pay ${tutor.enrollmentFee}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const SuccessPage = () => {
  const navigate = useNavigate()

  return (
    <section className="success-section">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle size={80} />
          </div>
          <h2>Enrollment Successful!</h2>
          <p>Your enrollment has been completed successfully. Your tutor will contact you within 24 hours to schedule your first session.</p>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/tutors')}>
              Find More Tutors
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/tutor-dashboard" element={<TutorDashboard />} />
            <Route path="/tutors" element={<TutorsList />} />
            <Route path="/tutor/:id" element={<TutorProfile />} />
            <Route path="/payment/:id" element={<PaymentForm />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
