import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/modern.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <div className="glass-card fade-in-up" style={{ 
          maxWidth: '450px', 
          width: '100%',
          padding: '50px 40px',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
          backdropFilter: 'blur(30px)',
          border: '2px solid rgba(255,255,255,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          
          <div className="slide-in-down" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
            <h2 className="text-gradient" style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800',
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Welcome Back!
            </h2>
            <p style={{ 
              color: '#4a5568',
              fontSize: '1.1rem'
            }}>
              Sign in to continue your club journey
            </p>
          </div>

          {error && (
            <div className="scale-in" style={{ 
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '12px',
              marginBottom: '25px',
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '8px',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                📧 Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="modern-input"
                placeholder="Enter your email address"
                style={{ 
                  width: '100%',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '8px',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="modern-input"
                placeholder="Enter your password"
                style={{ 
                  width: '100%',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '8px',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                🎭 Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="modern-select"
                style={{ 
                  width: '100%',
                  fontSize: '16px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e0',
                  backgroundColor: 'white'
                }}
              >
                <option value="student">Student</option>
                <option value="clubLeader">Club Leader</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-modern btn-primary hover-glow"
              style={{ 
                width: '100%',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '15px',
                background: loading ? 
                  'linear-gradient(135deg, #a0aec0 0%, #718096 100%)' : 
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div className="spinner" style={{ 
                    width: '20px', 
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Signing in...
                </span>
              ) : (
                '🚀 Sign In'
              )}
            </button>
          </form>

          <div className="fade-in" style={{ 
            textAlign: 'center', 
            marginTop: '30px',
            animationDelay: '0.4s'
          }}>
            <p style={{ 
              color: '#718096',
              fontSize: '15px',
              marginBottom: '15px'
            }}>
              Don't have an account?
            </p>
            <Link 
              to="/register"
              className="btn-modern hover-glow"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                color: '#2d3748',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '600',
                padding: '12px 25px'
              }}
            >
              ✨ Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;