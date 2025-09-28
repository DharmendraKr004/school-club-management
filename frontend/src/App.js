import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClubDirectory from './pages/ClubDirectory';
import Dashboard from './pages/Dashboard';

// Import CSS
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes for School Club & Organization Management Platform */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/clubs" element={<ClubDirectory />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
