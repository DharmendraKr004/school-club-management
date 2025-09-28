import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile')
};

// Clubs API (Fixed export that was causing the error)
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

// Users API
export const usersAPI = {
  getJoinedClubs: () => api.get('/users/clubs'),
  getManagedClubs: () => api.get('/users/managed-clubs'),
  getDashboardData: () => api.get('/users/dashboard')
};

export default api;