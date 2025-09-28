import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clubsAPI } from '../services/api';
import Loading from '../components/Loading';

const ClubDirectory = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await clubsAPI.getAllClubs();
      setClubs(response.data.clubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || club.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(clubs.map(club => club.category))];
  
  const getCategoryGradient = (category) => {
    const gradients = {
      'Arts & Culture': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Academic': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Technology': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Community Service': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'Hobby': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'Sports': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'default': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    };
    return gradients[category] || gradients.default;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-container">
          <Loading message="Discovering amazing clubs..." />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="fade-in-up">
          <h1 className="text-gradient" style={{ 
            fontSize: '3rem', 
            textAlign: 'center', 
            marginBottom: '20px',
            fontWeight: '800'
          }}>
            Discover Amazing Clubs
          </h1>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Find your passion, meet like-minded people, and make unforgettable memories
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="slide-in-left" style={{ 
          display: 'flex', 
          gap: '20px', 
          marginBottom: '40px', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <input
            type="text"
            placeholder="🔍 Search clubs by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="modern-input"
            style={{ 
              flex: 1, 
              maxWidth: '400px',
              minWidth: '250px'
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="modern-input"
            style={{ 
              minWidth: '200px',
              cursor: 'pointer'
            }}
          >
            <option value="">🎯 All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'Arts & Culture' ? '🎨' : 
                 category === 'Academic' ? '📚' :
                 category === 'Technology' ? '💻' :
                 category === 'Community Service' ? '🤝' :
                 category === 'Hobby' ? '🎮' :
                 category === 'Sports' ? '⚽' : '📌'} {category}
              </option>
            ))}
          </select>
        </div>

        {/* Results Counter */}
        {!loading && (
          <div className="fade-in" style={{ 
            textAlign: 'center', 
            marginBottom: '30px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem'
          }}>
            {filteredClubs.length === 0 ? (
              <span>🔍 No clubs found matching your criteria</span>
            ) : (
              <span>✨ Found {filteredClubs.length} amazing club{filteredClubs.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        )}

        {/* Clubs Grid */}
        {filteredClubs.length === 0 ? (
          <div className="scale-in glass-card" style={{ 
            textAlign: 'center', 
            padding: '60px 40px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>No clubs found</h3>
            <p style={{ color: '#718096' }}>Try adjusting your search criteria or browse all categories</p>
          </div>
        ) : (
          <div className="card-grid">
            {filteredClubs.map((club, index) => (
              <div 
                key={club._id} 
                className="modern-card hover-lift fade-in-up"
                style={{ 
                  background: `linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  animationDelay: `${index * 0.1}s`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Category Badge */}
                <div style={{ 
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '5px',
                  background: getCategoryGradient(club.category)
                }} />
                
                <div style={{ padding: '25px' }}>
                  {/* Category and Status */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px' 
                  }}>
                    <span style={{ 
                      background: getCategoryGradient(club.category),
                      color: 'white', 
                      padding: '8px 16px', 
                      borderRadius: '25px', 
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {club.category}
                    </span>
                    <div className="status-badge status-active">
                      Active
                    </div>
                  </div>
                  
                  {/* Club Name */}
                  <h3 style={{ 
                    marginBottom: '15px', 
                    color: '#2d3748',
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    lineHeight: '1.3'
                  }}>
                    {club.name}
                  </h3>
                  
                  {/* Description */}
                  <p style={{ 
                    color: '#4a5568', 
                    marginBottom: '20px', 
                    lineHeight: '1.6',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {club.description}
                  </p>
                  
                  {/* Club Info */}
                  <div style={{ 
                    marginBottom: '25px', 
                    padding: '15px',
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: '10px',
                    border: '1px solid rgba(102, 126, 234, 0.1)'
                  }}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: '10px',
                      fontSize: '14px'
                    }}>
                      <div>
                        <span style={{ color: '#718096', fontWeight: '500' }}>👨‍💼 Leader:</span>
                        <br />
                        <span style={{ color: '#2d3748', fontWeight: '600' }}>
                          {club.leader?.name || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#718096', fontWeight: '500' }}>👥 Members:</span>
                        <br />
                        <span style={{ color: '#2d3748', fontWeight: '600' }}>
                          {club.memberCount || 0}
                        </span>
                      </div>
                    </div>
                    
                    {club.meetingTime?.day && (
                      <div style={{ marginTop: '10px', fontSize: '14px' }}>
                        <span style={{ color: '#718096', fontWeight: '500' }}>📅 Meetings:</span>
                        <br />
                        <span style={{ color: '#2d3748', fontWeight: '600' }}>
                          {club.meetingTime.day}s at {club.meetingTime.time}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <Link 
                    to={`/clubs/${club._id}`} 
                    className="btn-modern btn-primary hover-glow"
                    style={{ 
                      width: '100%',
                      textAlign: 'center',
                      textDecoration: 'none',
                      background: getCategoryGradient(club.category),
                      fontWeight: '600',
                      fontSize: '15px'
                    }}
                  >
                    🚀 Explore Club
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubDirectory;