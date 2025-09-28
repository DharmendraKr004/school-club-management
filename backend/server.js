const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const clubRoutes = require('./routes/clubs');
const userRoutes = require('./routes/users');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://school-club-management-dharmendrakr004.vercel.app',
        'https://school-club-management.vercel.app'
      ]
    : ['http://localhost:3000'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/users', userRoutes);

// Basic route for School Club Management Platform
app.get('/', (req, res) => {
  res.json({
    message: 'School Club Management Platform API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      clubs: '/api/clubs',
      users: '/api/users'
    },
    features: [
      'User registration and authentication',
      'Club directory with search functionality',
      'Club leader dashboard for managing clubs',
      'Member management system',
      'Announcements and updates'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    availableEndpoints: ['/api/auth', '/api/clubs', '/api/users']
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/school-clubs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  console.log('🎓 School Club Management Platform Database Ready');
  
  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 School Club Management Server running on port ${PORT}`);
    console.log(`📱 API Base URL: http://localhost:${PORT}/api`);
    console.log('🎯 Ready for club discovery and management!');
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Serve static files in production (for Vercel deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

module.exports = app;