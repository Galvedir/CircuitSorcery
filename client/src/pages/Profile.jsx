import React, { useState } from 'react';

export default function Profile({ user, setUser }) {
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [msg, setMsg] = useState('');
  const [resetPw, setResetPw] = useState(false);
  const [newPw, setNewPw] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Profile updated!');
        setUser({ ...user, name });
        localStorage.setItem('user', JSON.stringify({ ...user, name }));
      } else {
        setMsg(data.message || 'Error updating profile');
      }
    } catch {
      setMsg('Error updating profile');
    }
  };

  const handleResetPw = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: newPw })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Password reset!');
        setResetPw(false);
        setNewPw('');
      } else {
        setMsg(data.message || 'Error resetting password');
      }
    } catch {
      setMsg('Error resetting password');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: 'white', padding: 32, borderRadius: 10, boxShadow: '0 2px 12px #0002' }}>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
        <label>Email</label>
        <input value={email} disabled style={{ width: '100%', marginBottom: 12, background: '#eee' }} />
        <button type="submit" style={{ width: '100%', padding: 8, background: '#282c34', color: 'white', border: 'none', borderRadius: 4 }}>Update Profile</button>
      </form>
      <div style={{ marginTop: 24 }}>
        <button onClick={() => setResetPw(v => !v)} style={{ background: '#484d5e', color: 'white', border: 'none', padding: 8, borderRadius: 4 }}>
          {resetPw ? 'Cancel' : 'Reset Password'}
        </button>
        {resetPw && (
          <form onSubmit={handleResetPw} style={{ marginTop: 12 }}>
            <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New Password" style={{ width: '100%', marginBottom: 10 }} />
            <button type="submit" style={{ width: '100%', padding: 8, background: '#282c34', color: 'white', border: 'none', borderRadius: 4 }}>Save New Password</button>
          </form>
        )}
      </div>
      {msg && <div style={{ color: msg.includes('Error') ? 'red' : 'green', marginTop: 16 }}>{msg}</div>}
    </div>
  );
}