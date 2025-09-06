import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

export default function TopBar({ user, onSignOut }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <header className="topbar">
      <div className="topbar-logo-group">
        <img src="/logo.png" alt="Logo" className="topbar-logo" />
        <span className="topbar-title">CircuitSorcery</span>
      </div>
      <div className="topbar-actions">
        {user ? (
          <div className="profile-menu" tabIndex={0}
               onBlur={() => setDropdownOpen(false)}
               style={{ position: 'relative', display: 'inline-block' }}>
            <button
              className="profile-button"
              onClick={() => setDropdownOpen(x => !x)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {initials}
            </button>
            {dropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/profile">Profile</Link>
                <button onClick={onSignOut}>Sign Out</button>
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