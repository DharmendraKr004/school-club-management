import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clubsAPI } from '../services/api';

const ClubDirectory = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');

  const categories = [
    'All', 'Academic', 'Sports', 'Arts', 'Technology', 
    'Community Service', 'Cultural', 'Professional'
  ];

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await clubsAPI.getAllClubs();
      setClubs(response.data.clubs || []);
    } catch (error) {
      setError('Failed to load clubs. Please try again later.');
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchClubs();
      return;
    }

    try {
      setLoading(true);
      const response = await clubsAPI.searchClubs(searchTerm);
      setClubs(response.data.clubs || []);
    } catch (error) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredClubs = clubs.filter(club => {
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || club.category === selectedCategory;
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="club-directory">
      <div className="container">
        <header className="directory-header">
          <h1>🔍 Discover School Clubs</h1>
          <p>Find and join clubs that match your interests</p>
        </header>

        <div className="search-filters">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search clubs by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading clubs...</p>
          </div>
        ) : (
          <div className="clubs-grid">
            {filteredClubs.length > 0 ? (
              filteredClubs.map(club => (
                <div key={club._id} className="club-card">
                  <div className="club-header">
                    <h3>{club.name}</h3>
                    <span className="club-category">{club.category}</span>
                  </div>
                  <p className="club-description">{club.description}</p>
                  <div className="club-stats">
                    <span className="member-count">👥 {club.members?.length || 0} members</span>
                    <span className="meeting-time">🕒 {club.meetingTime}</span>
                  </div>
                  <div className="club-actions">
                    <Link to={`/clubs/${club._id}`} className="btn btn-outline">
                      View Details
                    </Link>
                    <button className="btn btn-primary">
                      Join Club
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-clubs">
                <h3>No clubs found</h3>
                <p>Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        )}

        <div className="directory-footer">
          <p>
            <Link to="/">← Back to Home</Link> | 
            <Link to="/register"> Create Account</Link> | 
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDirectory;