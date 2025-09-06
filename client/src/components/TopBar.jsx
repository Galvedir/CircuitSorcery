import React from 'react';
import ProfileDropdown from './ProfileDropdown';

export default function TopBar({ user, setUser }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      background: '#282c34',
      color: 'white',
      padding: '0 2rem'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 22, letterSpacing: 1 }}>
        <img src="/logo.png" alt="logo" style={{ height: 40, verticalAlign: 'middle', marginRight: 10 }} />
        Circuit Sorcery
      </div>
      <div>
        {user ? <ProfileDropdown user={user} setUser={setUser} /> : null}
      </div>
    </header>
  );
}