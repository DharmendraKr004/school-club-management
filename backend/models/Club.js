const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Club name is required'],
    trim: true,
    maxlength: [100, 'Club name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Club description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Club category is required'],
    enum: [
      'Academic',
      'Sports',
      'Arts & Culture',
      'Technology',
      'Community Service',
      'Professional Development',
      'Hobby',
      'Religious',
      'Other'
    ]
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  officers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    position: {
      type: String,
      required: true
    }
  }],
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  }],
  meetingTime: {
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    time: String,
    location: String
  },
  contactInfo: {
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: String,
    socialMedia: {
      website: String,
      instagram: String,
      twitter: String,
      facebook: String
    }
  },
  requirements: {
    type: String,
    maxlength: [200, 'Requirements cannot exceed 200 characters']
  },
  tags: [{
    type: String,
    trim: true
  }],
  memberCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  establishedDate: {
    type: Date,
    default: Date.now
  },
  announcements: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Content cannot exceed 1000 characters']
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postedAt: {
      type: Date,
      default: Date.now
    },
    isImportant: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Update member count before saving
clubSchema.pre('save', function(next) {
  this.memberCount = this.members.filter(member => member.status === 'active').length;
  next();
});

// Index for search functionality
clubSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Club', clubSchema);