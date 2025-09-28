# 🎓 School Club & Organization Management Platform

A modern, full-stack web application that helps students discover and manage school clubs and organizations. Built for seamless club discovery, membership management, and community building.

## 🌟 Features

### For Students
- 🔍 **Club Discovery**: Browse and search through available clubs
- 🏷️ **Smart Filtering**: Filter clubs by category, status, and keywords  
- 👥 **Easy Joining**: Join clubs with one click
- 📊 **Personal Dashboard**: Track joined clubs and activities
- 📢 **Announcements**: Stay updated with club news

### For Club Leaders
- 🏗️ **Club Creation**: Create and manage club profiles
- 👑 **Member Management**: View and manage club members
- 📝 **Announcements**: Post updates and announcements
- 📈 **Club Analytics**: Track membership and engagement
- ⚙️ **Settings**: Customize club information and details

## 🚀 Live Demo

**🌐 [View Live Application](https://your-app-name.vercel.app)**

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing and security

### Frontend  
- **React.js** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Modern CSS** - Glass-morphism design with animations

### DevOps
- **Vercel** - Deployment and hosting
- **MongoDB Atlas** - Cloud database
- **Git** - Version control

## 📱 Screenshots

### Home Page
Beautiful landing page with modern glass-morphism design and animated elements.

### Club Directory
Advanced search and filtering with category-based color coding and modern card layouts.

### Dashboard
Personalized dashboard with gradient designs and smooth animations for both students and club leaders.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/school-clubs-platform.git
   cd school-clubs-platform
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files:
   
   **Backend** (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/school-clubs
   JWT_SECRET=your-super-secure-jwt-secret-key
   PORT=5000
   NODE_ENV=development
   ```
   
   **Frontend** (`frontend/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the application**
   
   **Option 1: Start both servers simultaneously**
   ```bash
   # From project root
   npm run dev
   ```
   
   **Option 2: Start servers separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend  
   cd frontend
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Sample Data

To populate your database with sample clubs and users:

```bash
cd backend
node scripts/seedData.js
```

This will create:
- 6 sample clubs across different categories
- 6 club leaders with unique profiles
- Realistic club data for testing

## 📁 Project Structure

```
school-clubs-platform/
├── backend/                 # Express.js API server
│   ├── models/             # Mongoose schemas
│   │   ├── User.js         # User model
│   │   └── Club.js         # Club model
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── clubs.js        # Club management routes
│   │   └── users.js        # User routes
│   ├── middleware/         # Custom middleware
│   │   └── auth.js         # JWT authentication middleware
│   ├── scripts/            # Utility scripts
│   │   └── seedData.js     # Database seeding
│   └── server.js           # Express server setup
├── frontend/               # React.js client
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.js   # Navigation component
│   │   │   ├── Loading.js  # Loading spinner
│   │   │   └── ErrorBoundary.js # Error handling
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js     # Landing page
│   │   │   ├── Login.js    # User login
│   │   │   ├── Register.js # User registration
│   │   │   ├── Dashboard.js # User dashboard
│   │   │   ├── ClubDirectory.js # Club browsing
│   │   │   └── ClubDetails.js # Individual club view
│   │   ├── context/        # React Context
│   │   │   └── AuthContext.js # Authentication state
│   │   ├── services/       # API services
│   │   │   └── api.js      # Axios configuration
│   │   └── styles/         # CSS files
│   │       ├── App.css     # Global styles
│   │       └── modern.css  # Modern UI components
├── .gitignore              # Git ignore rules
├── package.json            # Root package configuration
├── vercel.json             # Vercel deployment config
└── README.md               # Project documentation
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Clubs
- `GET /api/clubs` - Get all clubs with filtering
- `GET /api/clubs/:id` - Get specific club details  
- `POST /api/clubs` - Create new club (leaders only)
- `PUT /api/clubs/:id` - Update club (leaders only)
- `POST /api/clubs/:id/join` - Join a club
- `POST /api/clubs/:id/leave` - Leave a club

### Users
- `GET /api/users/clubs` - Get user's joined/managed clubs
- `PUT /api/users/profile` - Update user profile

## 🎨 UI/UX Features

- **Modern Glass-morphism Design** - Translucent cards with backdrop blur
- **Gradient Color System** - Category-based color coding
- **Smooth Animations** - Fade-in, slide-in, and hover effects
- **Responsive Layout** - Mobile-first design approach
- **Loading States** - Elegant loading spinners and skeletons
- **Error Handling** - User-friendly error messages and boundaries

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Environment Variables**
   Set these in Vercel dashboard:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Secure random string
   - `NODE_ENV` - production

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests (if implemented)
cd backend  
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React.js team for the amazing library
- MongoDB team for the excellent database
- Vercel for seamless deployment
- All the open-source contributors

---

⭐ **Star this repository if you found it helpful!** ⭐