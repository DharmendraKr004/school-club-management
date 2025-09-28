const mongoose = require('mongoose');
const User = require('../models/User');
const Club = require('../models/Club');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/school-clubs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await Club.deleteMany({});
    await User.deleteMany({ role: 'club_leader' });
    console.log('Cleared existing clubs and club leaders');

    // Create sample club leaders
    const leadersData = [
      { name: 'Alex Johnson', email: 'alex.johnson@school.edu', studentId: 'L001' },
      { name: 'Sarah Chen', email: 'sarah.chen@school.edu', studentId: 'L002' },
      { name: 'Marcus Wilson', email: 'marcus.wilson@school.edu', studentId: 'L003' },
      { name: 'Emily Davis', email: 'emily.davis@school.edu', studentId: 'L004' },
      { name: 'David Rodriguez', email: 'david.rodriguez@school.edu', studentId: 'L005' },
      { name: 'Jessica Kim', email: 'jessica.kim@school.edu', studentId: 'L006' }
    ];

    const clubLeaders = [];
    for (const leaderData of leadersData) {
      let leader = await User.findOne({ email: leaderData.email });
      if (!leader) {
        leader = new User({
          name: leaderData.name,
          email: leaderData.email,
          password: 'password123',
          role: 'club_leader',
          studentId: leaderData.studentId
        });
        await leader.save();
      }
      clubLeaders.push(leader);
    }
    console.log(`Created ${clubLeaders.length} club leaders`);

    // Sample clubs data
    const clubsData = [
      {
        name: 'Gaming Club',
        description: 'A community for gamers to connect, compete, and have fun together. We organize tournaments, game nights, and discussions about the latest games.',
        category: 'Hobby',
        leader: clubLeaders[0]._id,
        members: [],
        meetingTime: { day: 'Friday', time: '7:00 PM', location: 'Computer Lab A' },
        announcements: [
          {
            title: 'Welcome to Gaming Club!',
            content: 'Join us for weekly gaming sessions every Friday at 7 PM in the computer lab.',
            postedBy: clubLeaders[0]._id
          }
        ]
      },
      {
        name: 'Photography Club',
        description: 'Capture the world through your lens! Learn photography techniques, share your work, and participate in photo walks around campus.',
        category: 'Arts & Culture',
        leader: clubLeaders[1]._id,
        members: [],
        meetingTime: { day: 'Saturday', time: '10:00 AM', location: 'Art Building Room 201' },
        announcements: [
          {
            title: 'Photo Walk This Weekend',
            content: 'Join us for a campus photo walk this Saturday at 10 AM. Meet at the main entrance.',
            postedBy: clubLeaders[1]._id
          }
        ]
      },
      {
        name: 'Debate Society',
        description: 'Sharpen your speaking skills and engage in intellectual discussions on various topics. Perfect for future lawyers, politicians, and public speakers.',
        category: 'Academic',
        leader: clubLeaders[2]._id,
        members: [],
        meetingTime: { day: 'Wednesday', time: '4:00 PM', location: 'Library Conference Room' },
        announcements: []
      },
      {
        name: 'Environmental Club',
        description: 'Work together to make our school and community more environmentally friendly. Participate in cleanup drives, tree planting, and sustainability projects.',
        category: 'Community Service',
        leader: clubLeaders[3]._id,
        members: [],
        meetingTime: { day: 'Tuesday', time: '3:30 PM', location: 'Science Building 101' },
        announcements: [
          {
            title: 'Campus Cleanup Drive',
            content: 'Help us keep our campus clean! Volunteer for our monthly cleanup drive next Wednesday.',
            postedBy: clubLeaders[3]._id
          }
        ]
      },
      {
        name: 'Music Band',
        description: 'Whether you play an instrument or love to sing, join our school band! We perform at school events and local venues.',
        category: 'Arts & Culture',
        leader: clubLeaders[4]._id,
        members: [],
        meetingTime: { day: 'Thursday', time: '6:00 PM', location: 'Music Hall' },
        announcements: []
      },
      {
        name: 'Robotics Club',
        description: 'Build, program, and compete with robots! Perfect for students interested in engineering, programming, and technology.',
        category: 'Technology',
        leader: clubLeaders[5]._id,
        members: [],
        meetingTime: { day: 'Monday', time: '5:00 PM', location: 'Engineering Lab' },
        announcements: [
          {
            title: 'Robot Competition Preparation',
            content: 'We\'re preparing for the regional robotics competition. All members please attend practice sessions.',
            postedBy: clubLeaders[5]._id
          }
        ]
      }
    ];

    // Create clubs
    const clubs = await Club.insertMany(clubsData);
    console.log(`Created ${clubs.length} sample clubs`);

    // Update club leaders' managed clubs
    for (let i = 0; i < clubs.length; i++) {
      clubLeaders[i].managedClubs = [clubs[i]._id];
      await clubLeaders[i].save();
    }
    console.log('Updated club leaders\' managed clubs');

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();