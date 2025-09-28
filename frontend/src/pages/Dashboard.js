import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Mock data for now - will connect to API later
      const mockJoinedClubs = [
        {
          id: '1',
          name: 'Computer Science Club',
          category: 'Technology',
          description: 'Learn programming and technology together',
          members: 15,
          meetingTime: 'Fridays 3:00 PM',
          joinedAt: '2024-01-15'
        }
      ];
      
      setJoinedClubs(mockJoinedClubs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleLeaveClub = async (clubId) => {
    try {
      // Remove club from joined clubs
      setJoinedClubs(prev => prev.filter(club => club.id !== clubId));
      console.log('Left club:', clubId);
    } catch (error) {
      console.error('Error leaving club:', error);
    }
  };

  if (!user) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="card">
            <h2>Please log in to access your dashboard</h2>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Welcome back, {user.name}!</h1>
          <p>{user.role === 'clubLeader' ? 'Club Leader' : 'Student'} Dashboard</p>
          <button onClick={logout} className="btn btn-secondary">Logout</button>
        </div>

        <div className="grid">
          <div className="card">
            <h3>{joinedClubs.length}</h3>
            <p>Joined Clubs</p>
          </div>
          <div className="card">
            <h3>{user.role}</h3>
            <p>Account Type</p>
          </div>
          <div className="card">
            <h3>{user.email}</h3>
            <p>Email Address</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Your Clubs</h2>
          </div>
          
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading your clubs...</p>
            </div>
          ) : joinedClubs.length > 0 ? (
            <div className="grid">
              {joinedClubs.map((club, clubIndex) => (
                <div key={club.id} className="card">
                  <div className="card-header">
                    <h3 className="card-title">{club.name}</h3>
                    <span style={{fontSize: '0.9em', color: '#666'}}>{club.category}</span>
                  </div>
                  <p>{club.description}</p>
                  <div style={{margin: '10px 0', fontSize: '0.9em', color: '#666'}}>
                    <div>👥 {club.members} members</div>
                    <div>🕒 {club.meetingTime}</div>
                    <div>📅 Joined: {new Date(club.joinedAt).toLocaleDateString()}</div>
                  </div>
                  <button 
                    onClick={() => handleLeaveClub(club.id)}
                    className="btn btn-secondary"
                  >
                    Leave Club
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="card">
              <h3>No clubs joined yet</h3>
              <p>Discover and join clubs to get started!</p>
              <Link to="/clubs" className="btn btn-primary">Browse Clubs</Link>
            </div>
          )}
        </div>

        <div className="nav-links">
          <Link to="/clubs">Browse Clubs</Link>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;