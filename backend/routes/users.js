const express = require('express');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile (alias for auth/me)
// @access  Private
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('joinedClubs.club', 'name category')
      .populate('managedClubs', 'name category memberCount');

    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// @route   GET /api/users/clubs
// @desc    Get user's joined clubs
// @access  Private
router.get('/clubs', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('joinedClubs')
      .populate({
        path: 'joinedClubs.club',
        select: 'name description category memberCount leader meetingTime',
        populate: {
          path: 'leader',
          select: 'name email'
        }
      });

    res.json({
      message: 'User clubs retrieved successfully',
      clubs: user.joinedClubs
    });
  } catch (error) {
    console.error('User clubs fetch error:', error);
    res.status(500).json({ message: 'Server error fetching user clubs' });
  }
});

module.exports = router;