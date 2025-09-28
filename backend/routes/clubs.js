const express = require('express');
const { body, validationResult, param } = require('express-validator');
const Club = require('../models/Club');
const User = require('../models/User');
const { authenticate, requireClubLeader } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/clubs
// @desc    Get all clubs with optional search and filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10, sortBy = 'name' } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Execute query with pagination
    const clubs = await Club.find(query)
      .populate('leader', 'name email')
      .select('-announcements -members') // Exclude sensitive data
      .sort(sortBy)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const totalClubs = await Club.countDocuments(query);
    
    res.json({
      message: 'Clubs retrieved successfully',
      clubs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalClubs / limit),
        totalClubs,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Clubs fetch error:', error);
    res.status(500).json({ message: 'Server error fetching clubs' });
  }
});

// @route   GET /api/clubs/:id
// @desc    Get club by ID
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid club ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const club = await Club.findOne({ _id: req.params.id, isActive: true })
      .populate('leader', 'name email phoneNumber')
      .populate('officers.user', 'name email')
      .populate('members.user', 'name email')
      .populate('announcements.postedBy', 'name');

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.json({
      message: 'Club retrieved successfully',
      club
    });
  } catch (error) {
    console.error('Club fetch error:', error);
    res.status(500).json({ message: 'Server error fetching club' });
  }
});

// @route   POST /api/clubs
// @desc    Create a new club
// @access  Private (Club Leaders only)
router.post('/', authenticate, requireClubLeader, [
  body('name')
    .notEmpty()
    .withMessage('Club name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Club name must be between 2 and 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Club description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .notEmpty()
    .withMessage('Club category is required')
    .isIn(['Academic', 'Sports', 'Arts & Culture', 'Technology', 'Community Service', 'Professional Development', 'Hobby', 'Religious', 'Other'])
    .withMessage('Invalid club category'),
  body('contactInfo.email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('meetingTime.day')
    .optional()
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day'),
  body('requirements')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Requirements cannot exceed 200 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description, category, meetingTime, contactInfo, requirements, tags } = req.body;

    // Check if club name already exists
    const existingClub = await Club.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (existingClub) {
      return res.status(400).json({ message: 'A club with this name already exists' });
    }

    // Create new club
    const club = new Club({
      name,
      description,
      category,
      leader: req.user._id,
      meetingTime,
      contactInfo,
      requirements,
      tags: tags || [],
      members: [{ user: req.user._id }] // Add creator as first member
    });

    await club.save();

    // Add club to user's managedClubs
    await User.findByIdAndUpdate(req.user._id, {
      $push: { 
        managedClubs: club._id,
        joinedClubs: { club: club._id }
      }
    });

    // Populate leader info before sending response
    await club.populate('leader', 'name email');

    res.status(201).json({
      message: 'Club created successfully',
      club
    });
  } catch (error) {
    console.error('Club creation error:', error);
    res.status(500).json({ message: 'Server error creating club' });
  }
});

// @route   PUT /api/clubs/:id
// @desc    Update club information
// @access  Private (Club Leader of the specific club)
router.put('/:id', authenticate, requireClubLeader, [
  param('id').isMongoId().withMessage('Invalid club ID'),
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Club name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .optional()
    .isIn(['Academic', 'Sports', 'Arts & Culture', 'Technology', 'Community Service', 'Professional Development', 'Hobby', 'Religious', 'Other'])
    .withMessage('Invalid club category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is the club leader
    if (club.leader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You are not the leader of this club' });
    }

    // Update fields
    const allowedUpdates = ['name', 'description', 'category', 'meetingTime', 'contactInfo', 'requirements', 'tags'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('leader', 'name email');

    res.json({
      message: 'Club updated successfully',
      club: updatedClub
    });
  } catch (error) {
    console.error('Club update error:', error);
    res.status(500).json({ message: 'Server error updating club' });
  }
});

// @route   DELETE /api/clubs/:id
// @desc    Delete (deactivate) a club
// @access  Private (Club Leader of the specific club)
router.delete('/:id', authenticate, requireClubLeader, [
  param('id').isMongoId().withMessage('Invalid club ID')
], async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is the club leader
    if (club.leader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You are not the leader of this club' });
    }

    // Soft delete by setting isActive to false
    club.isActive = false;
    await club.save();

    // Remove club from all users' joinedClubs and managedClubs
    await User.updateMany(
      { 'joinedClubs.club': club._id },
      { $pull: { joinedClubs: { club: club._id } } }
    );
    
    await User.updateMany(
      { managedClubs: club._id },
      { $pull: { managedClubs: club._id } }
    );

    res.json({ message: 'Club deleted successfully' });
  } catch (error) {
    console.error('Club deletion error:', error);
    res.status(500).json({ message: 'Server error deleting club' });
  }
});

// @route   POST /api/clubs/:id/join
// @desc    Join a club
// @access  Private
router.post('/:id/join', authenticate, [
  param('id').isMongoId().withMessage('Invalid club ID')
], async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id, isActive: true });
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is already a member
    const isMember = club.members.some(member => 
      member.user.toString() === req.user._id.toString() && member.status === 'active'
    );
    
    if (isMember) {
      return res.status(400).json({ message: 'You are already a member of this club' });
    }

    // Add user to club members
    club.members.push({ user: req.user._id, status: 'active' });
    await club.save();

    // Add club to user's joinedClubs
    await User.findByIdAndUpdate(req.user._id, {
      $push: { joinedClubs: { club: club._id } }
    });

    res.json({
      message: 'Successfully joined the club',
      club: {
        id: club._id,
        name: club.name,
        category: club.category
      }
    });
  } catch (error) {
    console.error('Club join error:', error);
    res.status(500).json({ message: 'Server error joining club' });
  }
});

// @route   POST /api/clubs/:id/leave
// @desc    Leave a club
// @access  Private
router.post('/:id/leave', authenticate, [
  param('id').isMongoId().withMessage('Invalid club ID')
], async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is the club leader
    if (club.leader.toString() === req.user._id.toString()) {
      return res.status(400).json({ 
        message: 'Club leaders cannot leave their own club. Transfer leadership or delete the club instead.' 
      });
    }

    // Remove user from club members
    club.members = club.members.filter(member => 
      member.user.toString() !== req.user._id.toString()
    );
    await club.save();

    // Remove club from user's joinedClubs
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { joinedClubs: { club: club._id } }
    });

    res.json({ message: 'Successfully left the club' });
  } catch (error) {
    console.error('Club leave error:', error);
    res.status(500).json({ message: 'Server error leaving club' });
  }
});

// @route   GET /api/clubs/categories
// @desc    Get all available club categories
// @access  Public
router.get('/categories', (req, res) => {
  const categories = [
    'Academic',
    'Sports',
    'Arts & Culture',
    'Technology',
    'Community Service',
    'Professional Development',
    'Hobby',
    'Religious',
    'Other'
  ];
  
  res.json({
    message: 'Club categories retrieved successfully',
    categories
  });
});

// @route   POST /api/clubs/:id/announcements
// @desc    Add announcement to club
// @access  Private (Club Leader of the specific club)
router.post('/:id/announcements', authenticate, requireClubLeader, [
  param('id').isMongoId().withMessage('Invalid club ID'),
  body('title')
    .notEmpty()
    .withMessage('Announcement title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('content')
    .notEmpty()
    .withMessage('Announcement content is required')
    .isLength({ max: 1000 })
    .withMessage('Content cannot exceed 1000 characters'),
  body('isImportant')
    .optional()
    .isBoolean()
    .withMessage('isImportant must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is the club leader
    if (club.leader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You are not the leader of this club' });
    }

    const { title, content, isImportant = false } = req.body;

    const announcement = {
      title,
      content,
      postedBy: req.user._id,
      isImportant
    };

    club.announcements.push(announcement);
    await club.save();

    // Populate the newly added announcement
    await club.populate('announcements.postedBy', 'name');

    const newAnnouncement = club.announcements[club.announcements.length - 1];

    res.status(201).json({
      message: 'Announcement added successfully',
      announcement: newAnnouncement
    });
  } catch (error) {
    console.error('Announcement creation error:', error);
    res.status(500).json({ message: 'Server error creating announcement' });
  }
});

// @route   GET /api/clubs/:id/announcements
// @desc    Get club announcements
// @access  Public
router.get('/:id/announcements', [
  param('id').isMongoId().withMessage('Invalid club ID')
], async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .select('announcements name')
      .populate('announcements.postedBy', 'name')
      .lean();
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Sort announcements by date (newest first) and important ones first
    const sortedAnnouncements = club.announcements.sort((a, b) => {
      if (a.isImportant && !b.isImportant) return -1;
      if (!a.isImportant && b.isImportant) return 1;
      return new Date(b.postedAt) - new Date(a.postedAt);
    });

    res.json({
      message: 'Announcements retrieved successfully',
      announcements: sortedAnnouncements,
      clubName: club.name
    });
  } catch (error) {
    console.error('Announcements fetch error:', error);
    res.status(500).json({ message: 'Server error fetching announcements' });
  }
});

module.exports = router;