# 🎓 School Club & Organization Management Platform

## Setup Instructions

### Prerequisites
Before running this application, make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - OR Cloud: [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)
- **Git** (optional, for cloning)

### Quick Start

#### 1. Install Dependencies

**Backend Dependencies:**
```bash
cd backend
npm install
```

**Frontend Dependencies:**
```bash
cd frontend  
npm install
```

#### 2. Set Up MongoDB

**Option A: Local MongoDB**
1. Start your MongoDB service
2. The app will connect to `mongodb://localhost:27017/school-clubs`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `backend/.env`

#### 3. Configure Environment Variables

Make sure the `backend/.env` file exists with these settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/school-clubs
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
NODE_ENV=development
```

#### 4. Start the Application

**Terminal 1 - Start Backend:**
```powershell
# For PowerShell (Windows)
cd "C:\Users\dharm\OneDrive\Desktop\lu new p\backend"; npm start

# Or use separate commands:
cd backend
npm start
```
The backend will run on http://localhost:5000

**Terminal 2 - Start Frontend:**
```powershell
# For PowerShell (Windows)
cd "C:\Users\dharm\OneDrive\Desktop\lu new p\frontend"; npm start

# Or use separate commands:
cd frontend
npm start
```
The frontend will run on http://localhost:3000

### 🚀 Features Available

#### For Students:
- ✅ Browse club directory
- ✅ Search clubs by name, category, or tags
- ✅ View detailed club information
- ✅ Join clubs with one click
- ✅ User dashboard to manage joined clubs
- ✅ View club announcements

#### For Club Leaders:
- ✅ All student features
- ✅ Create new clubs
- ✅ Manage club information
- ✅ Post announcements
- ✅ View club members

#### Authentication:
- ✅ User registration (students and club leaders)
- ✅ Secure login with JWT tokens
- ✅ Protected routes
- ✅ Role-based access control

### 📱 Using the Application

#### First Time Setup:
1. Open http://localhost:3000
2. Click "Register" to create an account
3. Choose your role: "Student" or "Club Leader"
4. Fill out the registration form

#### As a Student:
1. Navigate to "Discover Clubs" to browse available clubs
2. Use the search and filter options to find clubs of interest
3. Click "View Details" to learn more about a club
4. Click "Join Club" to become a member
5. Visit your Dashboard to see your joined clubs

#### As a Club Leader:
1. Go to your Dashboard after logging in
2. Click "Create New Club" to start a new organization
3. Fill out the club details (name, description, category, etc.)
4. Submit the form to create your club
5. Manage announcements and members (features available)

### 🛠️ Troubleshooting

#### MongoDB Connection Issues:
- Make sure MongoDB service is running
- Check that the connection string in `.env` is correct
- For MongoDB Atlas, ensure your IP is whitelisted

#### Port Already in Use:
- **Backend (5000)**: 
  - Find what's using the port: `netstat -ano | findstr :5000`
  - Kill the process: `taskkill /PID [PID_NUMBER] /F`
  - Or change `PORT` in `backend/.env`
- **Frontend (3000)**: It will automatically suggest a different port

#### PowerShell Command Syntax:
- Use `;` instead of `&&` to chain commands
- Example: `cd backend; npm start` (not `cd backend && npm start`)

#### Dependencies Issues:
```powershell
# Clear npm cache and reinstall
npm cache clean --force
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force  
npm install
```

### 🔧 Development

#### Project Structure:
```
├── backend/          # Express.js API server
│   ├── models/      # MongoDB/Mongoose schemas
│   ├── routes/      # API route handlers
│   ├── middleware/  # Authentication middleware
│   └── server.js    # Main server file
├── frontend/        # React.js application  
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React Context (Auth)
│   │   └── services/   # API service functions
└── README.md
```

#### Adding New Features:
1. **Backend**: Add routes in `backend/routes/`, update models if needed
2. **Frontend**: Create components in `src/components/` or pages in `src/pages/`
3. **API Integration**: Update `src/services/api.js` for new endpoints

### 📋 API Endpoints

#### Authentication:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

#### Clubs:
- `GET /api/clubs` - Get all clubs (with search/filter)
- `GET /api/clubs/:id` - Get club details
- `POST /api/clubs` - Create new club (club leaders only)
- `POST /api/clubs/:id/join` - Join a club
- `POST /api/clubs/:id/announcements` - Add announcement

### 🎯 Next Steps / Future Enhancements

- [ ] Email notifications for club updates
- [ ] File upload for club logos
- [ ] Event management system
- [ ] Advanced member management
- [ ] Club analytics dashboard
- [ ] Mobile app version

### 💝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**🎉 Congratulations! You now have a fully functional School Club Management Platform!**

Need help? Check the troubleshooting section above or create an issue in the repository.