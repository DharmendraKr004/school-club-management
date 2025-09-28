import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import components for School Club & Organization Management Platform
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClubDirectory from './pages/ClubDirectory';
import Dashboard from './pages/Dashboard';
import ClubLeaderDashboard from './pages/ClubLeaderDashboard';

// Import basic CSS
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/clubs" element={<ClubDirectory />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leader-dashboard" element={<ClubLeaderDashboard />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
