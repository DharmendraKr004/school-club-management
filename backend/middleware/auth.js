const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

// Middleware to check if user is a club leader
const requireClubLeader = (req, res, next) => {
  if (req.user.role !== 'club_leader') {
    return res.status(403).json({ 
      message: 'Access denied. Club leader privileges required.' 
    });
  }
  next();
};

// Middleware to check if user is a club leader or admin
const requireClubLeaderOrAdmin = (req, res, next) => {
  if (req.user.role !== 'club_leader' && req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Access denied. Club leader or admin privileges required.' 
    });
  }
  next();
};

module.exports = {
  authenticate,
  requireClubLeader,
  requireClubLeaderOrAdmin
};