import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

export default function ProfileDropdown({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: '#4f5b62', color: 'white', fontWeight: 'bold',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', userSelect: 'none'
        }}
        title={user.name}
      >
        {getInitials(user.name)}
      </div>
      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 45, background: 'white',
          color: '#333', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          minWidth: 120, zIndex: 10
        }}>
          <div
            style={{ padding: '0.75rem', cursor: 'pointer' }}
            onClick={() => { setOpen(false); navigate('/profile'); }}
          >Profile</div>
          <div
            style={{ padding: '0.75rem', cursor: 'pointer' }}
            onClick={handleSignOut}
          >Sign Out</div>
        </div>
      )}
    </div>
  );
}