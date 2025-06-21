import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About BrightLearn</h2>
            <p>BrightLearn is dedicated to transforming education by connecting students with expert tutors for personalized, one-on-one learning experiences. Our mission is to make high-quality education accessible to everyone, everywhere, regardless of background or location.</p>
            <p>We believe that every learner is unique. That's why we focus on matching students with tutors who not only have subject expertise, but also a passion for teaching and mentoring. Our platform empowers students to excel in their studies, build confidence, and achieve their academic goals through tailored instruction and ongoing support.</p>
            <p>For tutors, BrightLearn offers a vibrant community and the tools needed to share knowledge, inspire learners, and grow professionally. We value integrity, curiosity, and lifelong learning, and we strive to create a supportive environment where both students and tutors can thrive.</p>
            <p>Join BrightLearn today and become part of a movement that is shaping the future of education—one student, one tutor, one success story at a time.</p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop" alt="Students learning" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 