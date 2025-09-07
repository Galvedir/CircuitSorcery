import React, { useState, useEffect } from 'react';

export default function Profile({ user, setUser }) {
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [msg, setMsg] = useState('');
  const [resetPw, setResetPw] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [group, setGroup] = useState(null);

  useEffect(() => {
    // Fetch group info if user is in a group
    if (user.group_id) {
      fetch(`http://localhost:5000/api/groups/me/${user.id}`)
        .then(res => res.json())
        .then(data => setGroup(data));
    }
  }, [user.group_id, user.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/users/profile`, {
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
    if (newPw !== confirmPw) {
      setMsg('Passwords do not match.');
      return;
    }
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
        setConfirmPw('');
      } else {
        setMsg(data.message || 'Error resetting password');
      }
    } catch {
      setMsg('Error resetting password');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto', padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-control"
            style={{ width: '100%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-email">Email</label>
          <input
            id="profile-email"
            value={email}
            disabled
            className="form-control"
            style={{ width: '100%' }}
          />
        </div>
        <div className="form-group">
          <label>Group</label>
          <input
            value={group ? group.name : 'No group'}
            disabled
            className="form-control"
            style={{ width: '100%' }}
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{ width: '100%', marginBottom: 12 }}
        >
          Update Profile
        </button>
      </form>
      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => setResetPw(v => !v)}
          className="btn"
          style={{ width: '100%', marginBottom: resetPw ? 12 : 0 }}
        >
          {resetPw ? 'Cancel' : 'Reset Password'}
        </button>
        {resetPw && (
          <form onSubmit={handleResetPw} style={{ marginTop: 12 }}>
            <input
              type="password"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              placeholder="New Password"
              className="form-control"
              style={{ width: '100%', marginBottom: 10 }}
              required
            />
            <input
              type="password"
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              placeholder="Confirm New Password"
              className="form-control"
              style={{ width: '100%', marginBottom: 10 }}
              required
            />
            <button
              type="submit"
              className="btn"
              style={{ width: '100%' }}
            >
              Save New Password
            </button>
          </form>
        )}
      </div>
      {msg && (
        <div
          style={{
            color: msg.includes('Error') || msg.includes('match') ? 'red' : 'green',
            marginTop: 16,
            textAlign: 'center'
          }}
        >
          {msg}
        </div>
      )}
    </div>
  );
}