import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobBoard from './pages/JobBoard';
import Auth from './pages/Auth';
import CreateJob from './pages/CreateJob';
import { Briefcase, User, LogOut, PlusCircle } from 'lucide-react';
import AddProfileInfo from './pages/AddProfileInfo';

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px' }}>
            <Briefcase color="white" size={24} />
          </div>
          <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900 }}>JobBNB</span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Browse Jobs</Link>
          {token ? (
            <>
              <Link to="/post-job" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlusCircle size={18} /> Post Job
              </Link>
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: '1px solid #f87171', color: '#f87171', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn-primary" style={{ textDecoration: 'none' }}>Login / Register</Link>
          )}
        </div>
      </nav>

      <main style={{ padding: '2rem 0' }}>
        <Routes>
          <Route path="/" element={<JobBoard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add-profile-info" element={<AddProfileInfo />}/>
          <Route path="/post-job" element={<CreateJob />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
