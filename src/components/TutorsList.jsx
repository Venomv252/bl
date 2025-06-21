import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Users, DollarSign, MapPin, Star } from 'lucide-react';
import tutorsData from '../data/tutorsData';

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();
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
  );
};

const TutorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const subjects = [...new Set(tutorsData.map(tutor => tutor.subject))];

  const filteredTutors = tutorsData.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === '' || tutor.subject === selectedSubject;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && tutor.hourlyRate <= 70) ||
                        (priceRange === 'medium' && tutor.hourlyRate > 70 && tutor.hourlyRate <= 80) ||
                        (priceRange === 'high' && tutor.hourlyRate > 80);
    return matchesSearch && matchesSubject && matchesPrice;
  });

  return (
    <section className="tutors-list">
      <div className="container">
        <div className="section-header">
          <h2>Find Your Perfect Tutor</h2>
          <p>Browse through our verified expert tutors and find the one that matches your learning needs</p>
        </div>
        <div className="filters">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search tutors or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="low">$50-70/hr</option>
              <option value="medium">$71-80/hr</option>
              <option value="high">$81+/hr</option>
            </select>
          </div>
        </div>
        <div className="tutors-grid">
          {filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorsList; 