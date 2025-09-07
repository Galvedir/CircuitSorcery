import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

export default function TopBar({ user, onSignOut }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <header className="topbar">
      <div className="topbar-logo-group">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="topbar-logo" />
        </Link>
        <span className="topbar-title">Circuit Sorcery Support Apps</span>
      </div>
      <div className="topbar-actions">
        {user ? (
          <div className="profile-menu" style={{ position: 'relative', display: 'inline-block' }}>
            <button
              className="profile-button"
              onClick={() => setDropdownOpen(x => !x)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {initials}
            </button>
            {dropdownOpen && (
              <div className="profile-dropdown" ref={dropdownRef}>
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <Link to="#" onClick={e => {e.preventDefault();setDropdownOpen(false);onSignOut();}}>Sign Out</Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="topbar-login">Login</Link>
        )}
      </div>
    </header>
  );
}