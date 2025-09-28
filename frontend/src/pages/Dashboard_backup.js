import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI, clubsAPI } from '../services/api';
import Loading from '../components/Loading';
import ClubForm from '../components/ClubForm';
import '../styles/modern.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [userClubs, setUserClubs] = useState([]);
  const [managedClubs, setManagedClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClubForm, setShowClubForm] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const clubsResponse = await usersAPI.getUserClubs();
      // Add null checks and ensure clubs array exists
      const clubs = clubsResponse?.data?.clubs || [];
      setUserClubs(Array.isArray(clubs) ? clubs : []);
      
      if (user?.role === 'club_leader') {
        // Fetch managed clubs for club leaders
        // This would need a specific API endpoint
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Set empty array on error to prevent null reference issues
      setUserClubs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClubCreated = (newClub) => {
    setShowClubForm(false);
    // Refresh user data to show the new club
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-container">
          <Loading message="Loading dashboard..." />
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
            marginBottom: '10px',
            fontWeight: '800'
          }}>
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '50px'
          }}>
            Ready to explore and manage your club activities?
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {/* My Clubs Section */}
          <div className="slide-in-left glass-card" style={{ padding: '30px' }}>
            <h2 style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🎯 My Clubs ({userClubs?.length || 0})
            </h2>
            
            {userClubs && userClubs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {userClubs.map(({ club, joinedAt }, index) => {
                  // Add null checks for club data
                  if (!club || !club._id) return null;
                  
                  return (
                    <div key={club._id} className="modern-card hover-lift fade-in-up" style={{ 
                      animationDelay: `${index * 0.1}s`,
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '20px'
                    }}>
                      <h3 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1.3rem', fontWeight: '600' }}>
                        {club.name || 'Unnamed Club'}
                      </h3>
                      <div style={{ marginBottom: '15px' }}>
                        <span style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white', 
                          padding: '5px 12px', 
                          borderRadius: '20px', 
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {club.category || 'General'}
                        </span>
                      </div>
                      <p style={{ color: '#4a5568', marginBottom: '8px' }}>
                        <strong>👨‍💼 Leader:</strong> {club.leader?.name || 'TBA'}
                      </p>
                      <p style={{ color: '#718096', fontSize: '14px', marginBottom: '15px' }}>
                        📅 Joined: {joinedAt ? new Date(joinedAt).toLocaleDateString() : 'Unknown'}
                      </p>
                      <Link 
                        to={`/clubs/${club._id}`} 
                        className="btn-modern btn-primary hover-glow"
                        style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        🚀 View Club
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card" style={{ 
                textAlign: 'center', 
                padding: '50px 30px',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎭</div>
                <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>No clubs yet!</h3>
                <p style={{ color: '#718096', marginBottom: '25px' }}>Discover amazing clubs and start your journey</p>
                <Link 
                  to="/clubs" 
                  className="btn-modern btn-primary hover-glow"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textDecoration: 'none'
                  }}
                >
                  🔍 Discover Clubs
                </Link>
              </div>
            )}
          </div>

          {/* Club Leader Section */}
          {user?.role === 'club_leader' && (
            <div className="slide-in-right glass-card" style={{ padding: '30px' }}>
              <h2 style={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                👑 Leader Dashboard
              </h2>
              <div className="modern-card" style={{ 
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '25px'
              }}>
                <p style={{ color: '#4a5568', marginBottom: '25px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  🚀 As a club leader, you have the power to create amazing communities, manage members, and inspire others!
                </p>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: showClubForm ? '25px' : '0' }}>
                  <button 
                    className="btn-modern hover-glow"
                    style={{ 
                      background: showClubForm ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' : 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '600'
                    }}
                    onClick={() => setShowClubForm(!showClubForm)}
                  >
                    {showClubForm ? '❌ Cancel' : '➕ Create New Club'}
                  </button>
                  <button 
                    className="btn-modern hover-glow"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '600'
                    }}
                    onClick={() => alert('📊 Advanced club management features coming soon! Stay tuned for member analytics, announcements, and more!')}
                  >
                    📊 Manage Clubs
                  </button>
                </div>
                {showClubForm && (
                  <div className="scale-in" style={{ 
                    marginTop: '25px', 
                    borderTop: '2px solid rgba(102, 126, 234, 0.2)', 
                    paddingTop: '25px',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)',
                    borderRadius: '15px',
                    padding: '25px'
                  }}>
                    <ClubForm onClubCreated={handleClubCreated} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="slide-in-up glass-card" style={{ padding: '30px' }}>
            <h2 style={{ 
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              ⚡ Quick Actions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Link 
                to="/clubs" 
                className="modern-card hover-lift"
                style={{ 
                  display: 'block', 
                  padding: '20px', 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#2d3748', 
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    🔍
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>Browse All Clubs</div>
                    <div style={{ fontSize: '14px', color: '#718096' }}>Discover new communities</div>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/profile" 
                className="modern-card hover-lift"
                style={{ 
                  display: 'block', 
                  padding: '20px', 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#2d3748', 
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>Edit Profile</div>
                    <div style={{ fontSize: '14px', color: '#718096' }}>Update your information</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;