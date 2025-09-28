import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/modern.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    studentId: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      setError('Phone number must be exactly 10 digits');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Frontend validation first
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Clean up the form data before sending
    const cleanFormData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      ...(formData.studentId && formData.studentId.trim() && { studentId: formData.studentId.trim() }),
      ...(formData.phoneNumber && formData.phoneNumber.trim() && { phoneNumber: formData.phoneNumber.trim() })
    };

    const result = await register(cleanFormData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
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
          maxWidth: '550px', 
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
            top: '-30px',
            right: '-30px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite'
          }}></div>
          
          <div className="slide-in-down" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✨</div>
            <h2 className="text-gradient" style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800',
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Join the Community!
            </h2>
            <p style={{ 
              color: '#4a5568',
              fontSize: '1.1rem'
            }}>
              Create your account and start discovering amazing clubs
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
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2d3748',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  👤 Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="modern-input"
                  placeholder="Enter your full name"
                  style={{ 
                    width: '100%',
                    fontSize: '15px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2d3748',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  👑 Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="modern-input"
                  style={{ 
                    width: '100%',
                    fontSize: '15px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="student">🎓 Student</option>
                  <option value="club_leader">👨‍💼 Club Leader</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
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
                  fontSize: '15px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
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
                placeholder="Create a strong password (6+ characters)"
                style={{ 
                  width: '100%',
                  fontSize: '15px'
                }}
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2d3748',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  🆔 Student ID <span style={{ color: '#718096', fontWeight: '400' }}>(optional)</span>
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="modern-input"
                  placeholder="Your student ID"
                  style={{ 
                    width: '100%',
                    fontSize: '15px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2d3748',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  📱 Phone Number <span style={{ color: '#718096', fontWeight: '400' }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="modern-input"
                  placeholder="1234567890"
                  style={{ 
                    width: '100%',
                    fontSize: '15px'
                  }}
                />
              </div>
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
                  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                  Creating Account...
                </span>
              ) : (
                '🚀 Create Account'
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
              Already have an account?
            </p>
            <Link 
              to="/login"
              className="btn-modern hover-glow"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                color: '#2d3748',
                border: '2px solid rgba(240, 147, 251, 0.3)',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '600',
                padding: '12px 25px'
              }}
            >
              🔐 Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;