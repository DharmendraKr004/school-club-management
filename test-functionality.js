const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAllFunctionality() {
  console.log('🧪 Testing School Club Management Platform...\n');

  try {
    // Test 1: Backend Health Check
    console.log('1️⃣ Testing Backend Health...');
    const healthCheck = await axios.get('http://localhost:5000/');
    console.log('✅ Backend is running properly');
    console.log(`📊 Response: ${healthCheck.data.message}\n`);

    // Test 2: Club Directory
    console.log('2️⃣ Testing Club Directory...');
    const clubsResponse = await axios.get(`${API_BASE}/clubs`);
    console.log(`✅ Found ${clubsResponse.data.clubs?.length || 0} clubs`);
    if (clubsResponse.data.clubs?.length > 0) {
      console.log(`📋 Sample club: ${clubsResponse.data.clubs[0].name}\n`);
    }

    // Test 3: User Registration
    console.log('3️⃣ Testing User Registration...');
    const testUser = {
      name: 'Test Student',
      email: `test${Date.now()}@student.edu`,
      password: 'password123',
      role: 'student',
      studentId: 'STU001'
    };

    const registerResponse = await axios.post(`${API_BASE}/auth/register`, testUser);
    console.log('✅ User registration working');
    const token = registerResponse.data.token;

    // Test 4: User Login
    console.log('4️⃣ Testing User Login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login working');

    // Test 5: Protected Routes
    console.log('5️⃣ Testing Protected Routes...');
    const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`✅ Protected routes working - User: ${profileResponse.data.name}\n`);

    // Test 6: Club Search
    console.log('6️⃣ Testing Club Search...');
    const searchResponse = await axios.get(`${API_BASE}/clubs?search=gaming`);
    console.log(`✅ Club search working - Found ${searchResponse.data.clubs?.length || 0} results\n`);

    console.log('🎉 ALL TESTS PASSED! Your application is fully functional!\n');
    
    return {
      status: 'success',
      tests: {
        backend: '✅ Working',
        clubs: '✅ Working', 
        auth: '✅ Working',
        search: '✅ Working',
        protected: '✅ Working'
      }
    };

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return {
      status: 'error',
      error: error.message
    };
  }
}

// Run tests
testAllFunctionality().then(result => {
  if (result.status === 'success') {
    console.log('🚀 Ready to deploy to GitHub!\n');
    console.log('📋 Test Summary:');
    Object.entries(result.tests).forEach(([test, status]) => {
      console.log(`   ${test}: ${status}`);
    });
  }
});