import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, LogOut, PlusCircle } from 'lucide-react';

function Navbar({ token }) {
  return (
    <nav
      style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px' }}>
          <Briefcase color="white" size={24} />
        </div>
        <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900 }}>
          JobBNB
        </span>
      </Link>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link
          to="/"
          style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}
        >
          Browse Jobs
        </Link>

        {token ? (
          <>
            <Link
              to="/post-job"
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <PlusCircle size={18} /> Post Job
            </Link>

            <Link
              to="/profile"
              style={{ color: 'var(--text-main)', textDecoration: 'none' }}
            >
              Profile
            </Link>
          </>
        ) : (
          <Link to="/auth" className="btn-primary" style={{ textDecoration: 'none' }}>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
