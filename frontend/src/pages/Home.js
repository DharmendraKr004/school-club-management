import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>School Club & Organization Management Platform</h1>
          <p>Discover and manage school clubs with ease</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Welcome to Our Platform</h2>
          </div>
          <p>
            This platform helps students discover clubs and organizations,
            and provides tools for club leaders to manage their groups effectively.
          </p>

          <div className="nav-links">
            <Link to="/clubs" className="btn btn-primary">
              Browse Clubs
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <h3>For Students</h3>
            <ul>
              <li>Discover clubs by interests</li>
              <li>Join clubs easily</li>
              <li>Manage your memberships</li>
              <li>Stay updated with announcements</li>
            </ul>
          </div>

          <div className="card">
            <h3>For Club Leaders</h3>
            <ul>
              <li>Create and manage clubs</li>
              <li>Track membership</li>
              <li>Send announcements</li>
              <li>Organize club activities</li>
            </ul>
          </div>

          <div className="card">
            <h3>Technology Stack</h3>
            <ul>
              <li>Backend: Node.js with Express.js</li>
              <li>Database: MongoDB with Mongoose</li>
              <li>Frontend: React.js</li>
              <li>Auth: JWT tokens with bcrypt</li>
            </ul>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/clubs">Browse Clubs</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;