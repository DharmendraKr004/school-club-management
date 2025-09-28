import axios from 'axios';

// API configuration for School Club Management Platform
const getBaseURL = () => {
  // For production Vercel deployment
  if (window.location.hostname.includes('vercel.app')) {
    return '/api';
  }
  
  // For GitHub Pages deployment
  if (window.location.hostname.includes('github.io')) {
    return 'https://schoolclubplatform-8tozzxe1p.vercel.app/api';
  }
  
  // For local development
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

const API_BASE_URL = getBaseURL();

// Create axios instance for School Club Management Platform
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Authentication expired. Please login again.');
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions based on copilot instructions
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile')
};

// Clubs API functions for club discovery and management
export const clubsAPI = {
  getAllClubs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/clubs${queryString ? `?${queryString}` : ''}`);
  },
  getClubById: (clubId) => api.get(`/clubs/${clubId}`),
  createClub: (clubData) => api.post('/clubs', clubData),
  updateClub: (clubId, clubData) => api.put(`/clubs/${clubId}`, clubData),
  joinClub: (clubId) => api.post(`/clubs/${clubId}/join`),
  leaveClub: (clubId) => api.post(`/clubs/${clubId}/leave`),
  searchClubs: (searchTerm) => api.get(`/clubs?search=${encodeURIComponent(searchTerm)}`)
};

// Users API functions for member management
export const usersAPI = {
  getJoinedClubs: () => api.get('/users/clubs'),
  getManagedClubs: () => api.get('/users/managed-clubs'),
  getDashboardData: () => api.get('/users/dashboard')
};

export default api;
export { API_BASE_URL };