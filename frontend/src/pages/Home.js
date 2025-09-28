import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/modern.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="content-container">
          <div className="fade-in-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontSize: '8rem', marginBottom: '30px' }} className="bounce">
              🎓
            </div>
            <h1 className="text-gradient" style={{ 
              fontSize: '4rem', 
              fontWeight: '800',
              marginBottom: '30px',
              lineHeight: '1.1'
            }}>
              Discover Your Perfect School Club
            </h1>
            <p style={{ 
              fontSize: '1.4rem', 
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '50px',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 50px'
            }}>
              Connect with like-minded students, explore your interests, and make lasting friendships through our diverse collection of school clubs and organizations.
            </p>
            <div className="slide-in-up" style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              animationDelay: '0.3s'
            }}>
              <Link to="/clubs" className="btn-modern btn-primary hover-glow" style={{
                fontSize: '1.2rem',
                padding: '15px 35px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textDecoration: 'none'
              }}>
                🚀 Explore Clubs
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="btn-modern hover-glow" style={{
                  fontSize: '1.2rem',
                  padding: '15px 35px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  textDecoration: 'none'
                }}>
                  ✨ Join Today
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: '3rem',
          opacity: '0.1',
          animation: 'float 6s ease-in-out infinite'
        }}>📚</div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          fontSize: '2.5rem',
          opacity: '0.1',
          animation: 'float 4s ease-in-out infinite reverse'
        }}>🎨</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          fontSize: '2rem',
          opacity: '0.1',
          animation: 'float 5s ease-in-out infinite'
        }}>⚽</div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          right: '10%',
          fontSize: '2.5rem',
          opacity: '0.1',
          animation: 'float 7s ease-in-out infinite reverse'
        }}>💻</div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '100px 0',
        position: 'relative'
      }}>
        <div className="content-container">
          <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="text-gradient" style={{ 
              fontSize: '3rem', 
              fontWeight: '800',
              marginBottom: '20px'
            }}>
              Why Join Our Platform? 🌟
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover the amazing benefits of being part of our vibrant community
            </p>
          </div>
          
          <div className="card-grid">
            <div className="glass-card hover-lift fade-in-up" style={{ 
              padding: '40px',
              textAlign: 'center',
              animationDelay: '0.1s'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '25px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>🔍</div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '15px',
                color: '#2d3748'
              }}>Discover Clubs</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Browse through a comprehensive directory of school clubs and organizations. Find the perfect match for your interests and passions.
              </p>
            </div>
            
            <div className="glass-card hover-lift fade-in-up" style={{ 
              padding: '40px',
              textAlign: 'center',
              animationDelay: '0.2s'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '25px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>👥</div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '15px',
                color: '#2d3748'
              }}>Connect with Students</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Meet like-minded students, make new friends, and build lasting relationships within your school community.
              </p>
            </div>
            
            <div className="glass-card hover-lift fade-in-up" style={{ 
              padding: '40px',
              textAlign: 'center',
              animationDelay: '0.3s'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '25px',
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>📅</div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '15px',
                color: '#2d3748'
              }}>Stay Updated</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Get real-time updates on club activities, meetings, events, and important announcements from club leaders.
              </p>
            </div>
            
            <div className="glass-card hover-lift fade-in-up" style={{ 
              padding: '40px',
              textAlign: 'center',
              animationDelay: '0.4s'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '25px',
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>🏆</div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '15px',
                color: '#2d3748'
              }}>Leadership Opportunities</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Start your own club, lead initiatives, and develop valuable leadership skills that will benefit you throughout life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ 
        padding: '100px 0',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
      }}>
        <div className="content-container">
          <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="text-gradient" style={{ 
              fontSize: '3rem', 
              fontWeight: '800',
              marginBottom: '20px'
            }}>
              Popular Categories 🎯
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Explore our diverse range of club categories and find your passion
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '25px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <Link to="/clubs?category=Academic" className="modern-card hover-lift fade-in-up" style={{ 
              textDecoration: 'none',
              color: 'inherit',
              padding: '30px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              animationDelay: '0.1s'
            }}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>📚</div>
              <h3 style={{ 
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#2d3748'
              }}>Academic</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>Study groups, honor societies, and academic competitions</p>
            </Link>
            
            <Link to="/clubs?category=Sports" className="modern-card hover-lift fade-in-up" style={{ 
              textDecoration: 'none',
              color: 'inherit',
              padding: '30px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              animationDelay: '0.2s'
            }}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>⚽</div>
              <h3 style={{ 
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#2d3748'
              }}>Sports</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>Athletic teams, intramural sports, and fitness clubs</p>
            </Link>
            
            <Link to="/clubs?category=Arts & Culture" className="modern-card hover-lift fade-in-up" style={{ 
              textDecoration: 'none',
              color: 'inherit',
              padding: '30px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              animationDelay: '0.3s'
            }}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>🎨</div>
              <h3 style={{ 
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#2d3748'
              }}>Arts & Culture</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>Art, music, theater, and cultural organizations</p>
            </Link>
            
            <Link to="/clubs?category=Technology" className="modern-card hover-lift fade-in-up" style={{ 
              textDecoration: 'none',
              color: 'inherit',
              padding: '30px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              animationDelay: '0.4s'
            }}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>💻</div>
              <h3 style={{ 
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#2d3748'
              }}>Technology</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>Coding clubs, robotics, and tech innovation groups</p>
            </Link>
            
            <Link to="/clubs?category=Community Service" className="modern-card hover-lift fade-in-up" style={{ 
              textDecoration: 'none',
              color: 'inherit',
              padding: '30px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              animationDelay: '0.5s'
            }}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>❤️</div>
              <h3 style={{ 
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#2d3748'
              }}>Community Service</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>Volunteer organizations and community outreach programs</p>
            </Link>
            
            <Link to="/clubs?category=Hobby" className="modern-card hover-lift fade-in-up" style={{ 
              textDecoration: 'none',
              color: 'inherit',
              padding: '30px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              animationDelay: '0.6s'
            }}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>🎮</div>
              <h3 style={{ 
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#2d3748'
              }}>Hobbies & Fun</h3>
              <p style={{ 
                color: '#4a5568',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>Gaming, hobbies, and recreational activity groups</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="content-container">
          <div className="glass-card fade-in-up" style={{ 
            padding: '60px 40px',
            maxWidth: '700px',
            margin: '0 auto',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '30px' }}>🚀</div>
            <h2 className="text-gradient" style={{ 
              fontSize: '2.8rem', 
              fontWeight: '800',
              marginBottom: '25px'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Join thousands of students who have found their community through our platform. Your next adventure awaits! 🌟
            </p>
            
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-modern btn-primary hover-glow" style={{
                fontSize: '1.3rem',
                padding: '18px 40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textDecoration: 'none'
              }}>
                🎯 Go to Dashboard
              </Link>
            ) : (
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link to="/register" className="btn-modern btn-primary hover-glow" style={{
                  fontSize: '1.2rem',
                  padding: '15px 35px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  textDecoration: 'none'
                }}>
                  ✨ Create Account
                </Link>
                <Link to="/login" className="btn-modern hover-glow" style={{
                  fontSize: '1.2rem',
                  padding: '15px 35px',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)',
                  textDecoration: 'none'
                }}>
                  🔐 Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: '-1'
        }}>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '30%',
            right: '15%',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite reverse'
          }}></div>
        </div>
      </section>
    </div>
  );
};

export default Home;