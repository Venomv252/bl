import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Heart, 
  MessageCircle, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  X,
  CheckSquare,
  Square,
  Users as UsersIcon,
  Award,
  Globe,
  Calendar,
  BookOpen
} from 'lucide-react';
import styles from './FindTutors.module.css';

// Mock data for tutors
const mockTutors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subjects: ["Mathematics", "Algebra", "Calculus", "Statistics"],
    bio: "Experienced mathematics educator with a passion for making complex concepts accessible. Specializes in helping students build strong foundational skills.",
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 75,
    location: "New York, NY",
    availability: "Mon-Fri, 9AM-6PM",
    experience: "8 years",
    students: 156,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    isOnline: true,
    isVerified: true,
    isFeatured: true,
    languages: ["English", "Spanish"],
    education: "PhD in Mathematics, MIT"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subjects: ["Physics", "Mechanics", "Thermodynamics", "Quantum Physics"],
    bio: "Award-winning physics professor with expertise in both theoretical and experimental physics. Committed to fostering scientific curiosity.",
    rating: 4.8,
    reviewCount: 203,
    hourlyRate: 85,
    location: "San Francisco, CA",
    availability: "Mon-Sat, 10AM-8PM",
    experience: "12 years",
    students: 203,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    isOnline: true,
    isVerified: true,
    isFeatured: false,
    languages: ["English", "Mandarin"],
    education: "PhD in Physics, Stanford University"
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    subjects: ["English Literature", "Creative Writing", "Shakespeare", "Essay Writing"],
    bio: "Passionate literature teacher who believes in the power of storytelling. Helps students develop critical thinking and analytical skills.",
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: 65,
    location: "Los Angeles, CA",
    availability: "Tue-Sun, 2PM-10PM",
    experience: "6 years",
    students: 89,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    isOnline: false,
    isVerified: true,
    isFeatured: false,
    languages: ["English", "Spanish"],
    education: "MA in English Literature, Columbia University"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    subjects: ["Chemistry", "Organic Chemistry", "Biochemistry", "Analytical Chemistry"],
    bio: "Research chemist turned educator with a talent for explaining complex chemical concepts in simple terms.",
    rating: 4.9,
    reviewCount: 178,
    hourlyRate: 80,
    location: "Boston, MA",
    availability: "Mon-Fri, 8AM-5PM",
    experience: "10 years",
    students: 178,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    isOnline: true,
    isVerified: true,
    isFeatured: true,
    languages: ["English"],
    education: "PhD in Chemistry, UC Berkeley"
  },
  {
    id: 5,
    name: "Ms. Lisa Thompson",
    subjects: ["Computer Science", "Python", "JavaScript", "Web Development"],
    bio: "Former software engineer with a passion for teaching programming. Specializes in making coding accessible to beginners.",
    rating: 4.6,
    reviewCount: 134,
    hourlyRate: 70,
    location: "Seattle, WA",
    availability: "Mon-Sat, 11AM-9PM",
    experience: "7 years",
    students: 134,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    isOnline: true,
    isVerified: false,
    isFeatured: false,
    languages: ["English"],
    education: "MS in Computer Science, Georgia Tech"
  },
  {
    id: 6,
    name: "Prof. David Kim",
    subjects: ["History", "World History", "American History", "European History"],
    bio: "Distinguished history professor with expertise in multiple historical periods. Makes history engaging and relevant to modern students.",
    rating: 4.8,
    reviewCount: 167,
    hourlyRate: 75,
    location: "Chicago, IL",
    availability: "Mon-Fri, 9AM-7PM",
    experience: "15 years",
    students: 167,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    isOnline: false,
    isVerified: true,
    isFeatured: false,
    languages: ["English", "Korean"],
    education: "PhD in History, Harvard University"
  },
  {
    id: 7,
    name: "Dr. Maria Garcia",
    subjects: ["Biology", "Anatomy", "Physiology", "Microbiology"],
    bio: "Medical professional with extensive teaching experience. Makes complex biological concepts easy to understand.",
    rating: 4.9,
    reviewCount: 142,
    hourlyRate: 90,
    location: "Miami, FL",
    availability: "Mon-Sun, 9AM-9PM",
    experience: "11 years",
    students: 142,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    isOnline: true,
    isVerified: true,
    isFeatured: true,
    languages: ["English", "Spanish"],
    education: "MD, University of Miami"
  },
  {
    id: 8,
    name: "Mr. Alex Patel",
    subjects: ["Economics", "Microeconomics", "Macroeconomics", "Statistics"],
    bio: "Former investment banker turned educator. Brings real-world experience to economic theory and applications.",
    rating: 4.5,
    reviewCount: 98,
    hourlyRate: 60,
    location: "Austin, TX",
    availability: "Mon-Fri, 6PM-10PM",
    experience: "5 years",
    students: 98,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    isOnline: true,
    isVerified: false,
    isFeatured: false,
    languages: ["English"],
    education: "MBA, University of Texas"
  }
];

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "English Literature", "History", "Economics", "Psychology", "Art",
  "Music", "Foreign Languages", "Test Prep", "Writing", "Reading"
];

const locations = [
  "Online", "New York, NY", "San Francisco, CA", "Los Angeles, CA",
  "Boston, MA", "Seattle, WA", "Chicago, IL", "Miami, FL", "Austin, TX"
];

const availabilityOptions = [
  "Weekdays", "Weekends", "Evenings", "Mornings", "Flexible"
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "experience", label: "Most Experienced" },
  { value: "students", label: "Most Students" },
  { value: "name", label: "Name A-Z" }
];

const FindTutors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
    availability: '',
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    isOnline: false,
    isVerified: false
  });
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [tutorsPerPage] = useState(6);

  // Filter and sort tutors
  const filteredTutors = useMemo(() => {
    let filtered = mockTutors.filter(tutor => {
      // Search query
      const matchesSearch = searchQuery === '' || 
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tutor.bio.toLowerCase().includes(searchQuery.toLowerCase());

      // Subject filter
      const matchesSubject = filters.subject === '' || 
        tutor.subjects.includes(filters.subject);

      // Location filter
      const matchesLocation = filters.location === '' || 
        tutor.location === filters.location ||
        (filters.location === 'Online' && tutor.isOnline);

      // Availability filter
      const matchesAvailability = filters.availability === '' || 
        tutor.availability.toLowerCase().includes(filters.availability.toLowerCase());

      // Price filter
      const matchesPrice = (filters.minPrice === '' || tutor.hourlyRate >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || tutor.hourlyRate <= parseInt(filters.maxPrice));

      // Rating filter
      const matchesRating = tutor.rating >= filters.minRating;

      // Online filter
      const matchesOnline = !filters.isOnline || tutor.isOnline;

      // Verified filter
      const matchesVerified = !filters.isVerified || tutor.isVerified;

      return matchesSearch && matchesSubject && matchesLocation && 
             matchesAvailability && matchesPrice && matchesRating && 
             matchesOnline && matchesVerified;
    });

    // Sort tutors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'students':
          return b.students - a.students;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);
  const currentTutors = filteredTutors.slice(
    (currentPage - 1) * tutorsPerPage,
    currentPage * tutorsPerPage
  );

  // Active filters for display
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => value !== '' && value !== false && value !== 0)
    .map(([key, value]) => ({
      key,
      label: key === 'minRating' ? `${value}+ Stars` :
             key === 'isOnline' ? 'Online Only' :
             key === 'isVerified' ? 'Verified Only' :
             value
    }));

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const removeFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: key === 'minRating' ? 0 : key === 'isOnline' || key === 'isVerified' ? false : '' }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      subject: '',
      location: '',
      availability: '',
      minPrice: '',
      maxPrice: '',
      minRating: 0,
      isOnline: false,
      isVerified: false
    });
    setCurrentPage(1);
  };

  const toggleFavorite = (tutorId) => {
    setFavorites(prev => 
      prev.includes(tutorId) 
        ? prev.filter(id => id !== tutorId)
        : [...prev, tutorId]
    );
  };

  const toggleCompare = (tutorId) => {
    setCompareList(prev => 
      prev.includes(tutorId) 
        ? prev.filter(id => id !== tutorId)
        : prev.length < 3 
          ? [...prev, tutorId]
          : prev
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${styles.ratingStar} ${i < Math.floor(rating) ? styles.filled : ''}`}
        fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
      />
    ));
  };

  const renderRatingFilter = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={`${styles.star} ${i < filters.minRating ? styles.filled : ''}`}
        onClick={() => handleFilterChange('minRating', i + 1)}
        style={{ cursor: 'pointer' }}
      />
    ));
  };

  return (
    <div className={styles.findTutorsRoot}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Find Your Perfect Tutor</h1>
          <p className={styles.pageSubtitle}>
            Discover expert tutors in your area or online. Filter by subject, location, and more.
          </p>
        </div>

        {/* Search Section */}
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by subject, tutor name, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Filter Panel */}
        <div className={`${styles.filterPanel} ${!showFilters ? styles.collapsed : ''}`}>
          <div className={styles.filterContent}>
            <div className={styles.filterGrid}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Subject</label>
                <select
                  className={styles.filterSelect}
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Location</label>
                <select
                  className={styles.filterSelect}
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Availability</label>
                <select
                  className={styles.filterSelect}
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                >
                  <option value="">Any Time</option>
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Price Range (per hour)</label>
                <div className={styles.priceRange}>
                  <div className={styles.priceInputs}>
                    <input
                      type="number"
                      className={styles.priceInput}
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      className={styles.priceInput}
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Minimum Rating</label>
                <div className={styles.ratingFilter}>
                  {renderRatingFilter()}
                  <span style={{ marginLeft: '0.5rem', color: '#64748b' }}>
                    {filters.minRating > 0 ? `${filters.minRating}+ stars` : 'Any rating'}
                  </span>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Options</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={filters.isOnline}
                      onChange={(e) => handleFilterChange('isOnline', e.target.checked)}
                    />
                    Online Only
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={filters.isVerified}
                      onChange={(e) => handleFilterChange('isVerified', e.target.checked)}
                    />
                    Verified Tutors Only
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.filterActions}>
              <div className={styles.activeFilters}>
                {activeFilters.map(filter => (
                  <div key={filter.key} className={styles.filterTag}>
                    {filter.label}
                    <button
                      className={styles.removeFilter}
                      onClick={() => removeFilter(filter.key)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {activeFilters.length > 0 && (
                  <button className={styles.clearFilters} onClick={clearAllFilters}>
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sort Section */}
        <div className={styles.sortSection}>
          <div className={styles.resultsCount}>
            Showing {filteredTutors.length} tutors
          </div>
          <div className={styles.sortControls}>
            <span className={styles.sortLabel}>Sort by:</span>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tutors Grid */}
        {currentTutors.length > 0 ? (
          <div className={styles.tutorsGrid}>
            {currentTutors.map(tutor => (
              <div key={tutor.id} className={`${styles.tutorCard} ${tutor.isFeatured ? styles.featured : ''}`}>
                {/* Favorite Button */}
                <button
                  className={`${styles.favoriteBtn} ${favorites.includes(tutor.id) ? styles.favorited : ''}`}
                  onClick={() => toggleFavorite(tutor.id)}
                >
                  <Heart size={16} fill={favorites.includes(tutor.id) ? '#dc2626' : 'none'} />
                </button>

                {/* Compare Checkbox */}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1 }}>
                  <input
                    type="checkbox"
                    checked={compareList.includes(tutor.id)}
                    onChange={() => toggleCompare(tutor.id)}
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>

                <div className={styles.tutorHeader}>
                  <div className={styles.tutorInfo}>
                    <img src={tutor.image} alt={tutor.name} className={styles.tutorAvatar} />
                    <div className={styles.tutorDetails}>
                      <h3 className={styles.tutorName}>{tutor.name}</h3>
                      <p className={styles.tutorSubjects}>{tutor.subjects.join(', ')}</p>
                      <div className={styles.tutorRating}>
                        <div className={styles.ratingStars}>
                          {renderStars(tutor.rating)}
                        </div>
                        <span className={styles.ratingText}>
                          {tutor.rating} ({tutor.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tutorMeta}>
                    <div className={styles.tutorRate}>${tutor.hourlyRate}/hr</div>
                    <div className={styles.tutorLocation}>
                      <MapPin size={14} />
                      {tutor.isOnline ? 'Online' : tutor.location}
                    </div>
                  </div>
                </div>

                <div className={styles.tutorContent}>
                  <p className={styles.tutorBio}>{tutor.bio}</p>
                  <div className={styles.tutorActions}>
                    <button
                      className={`${styles.actionBtn} ${styles.primary}`}
                      onClick={() => navigate(`/tutor/${tutor.id}`)}
                    >
                      <Eye size={16} />
                      View Profile
                    </button>
                    <button className={`${styles.actionBtn} ${styles.secondary}`}>
                      <MessageCircle size={16} />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <BookOpen className={styles.emptyStateIcon} />
            <h3 className={styles.emptyStateTitle}>No tutors found</h3>
            <p className={styles.emptyStateText}>
              Try adjusting your search criteria or filters to find more tutors.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationBtn}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`${styles.paginationBtn} ${currentPage === page ? styles.active : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            
            <button
              className={styles.paginationBtn}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Compare Section */}
        {compareList.length > 0 && (
          <div className={`${styles.compareSection} ${styles.visible}`}>
            <div className={styles.compareContent}>
              <div className={styles.compareInfo}>
                <div className={styles.compareCount}>{compareList.length}</div>
                <span>Tutors selected for comparison</span>
              </div>
              <button
                className={`${styles.compareBtn} ${compareList.length < 2 ? styles.disabled : ''}`}
                disabled={compareList.length < 2}
                onClick={() => {
                  // Navigate to comparison page or show modal
                  console.log('Compare tutors:', compareList);
                }}
              >
                Compare Tutors
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTutors; 