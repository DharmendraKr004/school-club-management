import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>🎓 School Club & Organization Management Platform</h1>
          <p>Discover, join, and manage school clubs with ease</p>
          
          <div className="hero-actions">
            <Link to="/clubs" className="btn btn-primary">
              Discover Clubs
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔍 Club Discovery</h3>
              <p>Browse and search through available clubs with advanced filtering</p>
            </div>
            <div className="feature-card">
              <h3>👥 Member Management</h3>
              <p>Join clubs, manage memberships, and connect with fellow students</p>
            </div>
            <div className="feature-card">
              <h3>📊 Leader Dashboard</h3>
              <p>Club leaders can manage clubs, members, and post announcements</p>
            </div>
            <div className="feature-card">
              <h3>🔐 Secure Authentication</h3>
              <p>JWT-based authentication system for students and club leaders</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">
              Join as Student
            </Link>
            <Link to="/login" className="btn btn-outline">
              Club Leader Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;