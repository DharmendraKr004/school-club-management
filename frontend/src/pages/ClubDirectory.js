import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ClubDirectory = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['All', 'Technology', 'Arts', 'Sports', 'Academic'];

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      // Mock data for now - will connect to API later
      const mockClubs = [
        {
          id: '1',
          name: 'Computer Science Club',
          category: 'Technology',
          description: 'Learn programming and technology together',
          members: 15,
          meetingTime: 'Fridays 3:00 PM'
        },
        {
          id: '2',
          name: 'Drama Society',
          category: 'Arts',
          description: 'Explore theater and performing arts',
          members: 8,
          meetingTime: 'Wednesdays 4:00 PM'
        },
        {
          id: '3',
          name: 'Basketball Team',
          category: 'Sports',
          description: 'Competitive basketball team',
          members: 12,
          meetingTime: 'Daily 5:00 PM'
        }
      ];
      
      setClubs(mockClubs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      setLoading(false);
    }
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || club.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Club Directory</h1>
          <p>Discover and join clubs that match your interests</p>
        </div>

        <div className="card">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading clubs...</p>
          </div>
        ) : (
          <div className="grid">
            {filteredClubs.length > 0 ? (
              filteredClubs.map(club => (
                <div key={club.id} className="card">
                  <div className="card-header">
                    <h3 className="card-title">{club.name}</h3>
                    <span style={{fontSize: '0.9em', color: '#666'}}>{club.category}</span>
                  </div>
                  <p>{club.description}</p>
                  <div style={{margin: '10px 0', fontSize: '0.9em', color: '#666'}}>
                    <div>👥 {club.members} members</div>
                    <div>🕒 {club.meetingTime}</div>
                  </div>
                  <button className="btn btn-primary">
                    Join Club
                  </button>
                </div>
              ))
            ) : (
              <div className="card">
                <h3>No clubs found</h3>
                <p>Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        )}

        <div className="nav-links">
          <Link to="/">Back to Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default ClubDirectory;