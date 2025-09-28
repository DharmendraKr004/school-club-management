const express = require('express');
const router = express.Router();

// Sample clubs data for School Club Management Platform
const sampleClubs = [
  {
    _id: '1',
    name: 'Computer Science Club',
    category: 'Technology', 
    description: 'Learn programming, web development, and explore the latest in technology. Weekly coding sessions and hackathons.',
    members: ['student1', 'student2', 'student3'],
    meetingTime: 'Fridays 3:00 PM',
    location: 'Lab 101',
    leader: 'John Doe'
  },
  {
    _id: '2',
    name: 'Drama Society',
    category: 'Arts',
    description: 'Explore theater, acting, and performing arts. Participate in school plays and drama competitions.',
    members: ['student4', 'student5'],
    meetingTime: 'Wednesdays 4:00 PM',
    location: 'Auditorium',
    leader: 'Jane Smith'
  },
  {
    _id: '3',
    name: 'Basketball Team',
    category: 'Sports',
    description: 'Join our competitive basketball team. Practice sessions and inter-school tournaments.',
    members: ['student6', 'student7', 'student8', 'student9'],
    meetingTime: 'Mondays & Thursdays 5:00 PM',
    location: 'Gymnasium',
    leader: 'Coach Wilson'
  },
  {
    _id: '4',
    name: 'Debate Club',
    category: 'Academic',
    description: 'Enhance your public speaking and argumentation skills through structured debates.',
    members: ['student10', 'student11'],
    meetingTime: 'Tuesdays 3:30 PM',
    location: 'Room 205',
    leader: 'Prof. Anderson'
  }
];

// Get all clubs with search and filtering
router.get('/', (req, res) => {
  try {
    let clubs = [...sampleClubs];
    
    // Search functionality
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      clubs = clubs.filter(club => 
        club.name.toLowerCase().includes(searchTerm) ||
        club.description.toLowerCase().includes(searchTerm) ||
        club.category.toLowerCase().includes(searchTerm)
      );
    }
    
    // Category filtering
    if (req.query.category) {
      clubs = clubs.filter(club => club.category === req.query.category);
    }
    
    res.json({
      success: true,
      message: 'Clubs retrieved successfully',
      clubs: clubs,
      total: clubs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving clubs',
      error: error.message
    });
  }
});

// Get club by ID
router.get('/:id', (req, res) => {
  try {
    const club = sampleClubs.find(c => c._id === req.params.id);
    
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Club retrieved successfully',
      club: club
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving club',
      error: error.message
    });
  }
});

// Create new club (placeholder for club leaders)
router.post('/', (req, res) => {
  try {
    const newClub = {
      _id: String(sampleClubs.length + 1),
      name: req.body.name || 'New Club',
      category: req.body.category || 'General',
      description: req.body.description || 'A new club for students',
      members: [],
      meetingTime: req.body.meetingTime || 'TBD',
      location: req.body.location || 'TBD',
      leader: req.body.leader || 'Unknown'
    };
    
    sampleClubs.push(newClub);
    
    res.status(201).json({
      success: true,
      message: 'Club created successfully',
      club: newClub
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating club',
      error: error.message
    });
  }
});

// Join club (placeholder for students)
router.post('/:id/join', (req, res) => {
  try {
    const club = sampleClubs.find(c => c._id === req.params.id);
    
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }
    
    // Simulate joining club
    const studentId = 'current_user_id'; // This would come from JWT token
    
    if (!club.members.includes(studentId)) {
      club.members.push(studentId);
    }
    
    res.json({
      success: true,
      message: `Successfully joined ${club.name}`,
      club: club
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error joining club',
      error: error.message
    });
  }
});

// Leave club (placeholder for students)
router.post('/:id/leave', (req, res) => {
  try {
    const club = sampleClubs.find(c => c._id === req.params.id);
    
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }
    
    // Simulate leaving club
    const studentId = 'current_user_id'; // This would come from JWT token
    club.members = club.members.filter(id => id !== studentId);
    
    res.json({
      success: true,
      message: `Successfully left ${club.name}`,
      club: club
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error leaving club',
      error: error.message
    });
  }
});

module.exports = router;