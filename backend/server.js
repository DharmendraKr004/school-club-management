const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes for School Club & Organization Management Platform
app.get('/api', (req, res) => {
  res.json({
    message: 'School Club & Organization Management Platform API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      clubs: '/api/clubs',
      users: '/api/users'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    platform: 'School Club & Organization Management Platform'
  });
});

// Mock data for development
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

// Basic clubs endpoint
app.get('/api/clubs', (req, res) => {
  res.json({
    success: true,
    clubs: mockClubs,
    total: mockClubs.length
  });
});

// Basic auth endpoints (mock)
app.post('/api/auth/register', (req, res) => {
  console.log('Registration request:', req.body);
  res.json({
    success: true,
    message: 'User registered successfully',
    user: {
      id: Date.now(),
      email: req.body.email,
      name: req.body.name,
      role: req.body.role || 'student'
    },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/login', (req, res) => {
  console.log('Login request:', req.body);
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: '1',
      email: req.body.email,
      name: 'User',
      role: 'student'
    },
    token: 'mock-jwt-token'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 School Club Management Server running on port ${PORT}`);
  console.log(`📱 API available at: http://localhost:${PORT}/api`);
});

module.exports = app;