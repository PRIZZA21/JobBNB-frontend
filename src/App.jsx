import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobBoard from './pages/JobBoard';
import Auth from './pages/Auth';
import CreateJob from './pages/CreateJob';
import AddProfileInfo from './pages/AddProfileInfo';
import ProfilePage from './pages/Profile';
import MainLayout from './layouts/MainLayout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);
    window.location.href = '/';
  };


  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT navbar */}
        <Route path="/auth" element={<Auth setToken={setToken}/>} />
        <Route path="/add-profile-info" element={<AddProfileInfo setToken={setToken}/>} />

        {/* Routes WITH navbar */}
        <Route element={<MainLayout token={token}/>}>
          <Route path="/" element={<JobBoard />} />
          <Route path="/post-job" element={<CreateJob />} />
          <Route path="/profile" element={<ProfilePage onLogout={handleLogout}/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
