import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/');
      } else {
        setMsg(data.message);
      }
    } catch {
      setMsg('Login failed.');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{
      maxWidth: 320, margin: '100px auto', background: 'white', padding: 24, borderRadius: 8, boxShadow: '0 2px 12px #0002'
    }}>
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 10 }} />
      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 10 }} />
      <button type="submit" style={{ width: '100%', padding: 8, background: '#282c34', color: 'white', border: 'none', borderRadius: 4 }}>Login</button>
      {msg && <div style={{ color: 'red', marginTop: 10 }}>{msg}</div>}
      <div style={{ marginTop: 16, fontSize: 14 }}>
        Forgot password? (feature coming soon)<br />
        No account? <span style={{ color: '#282c34', cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</span>
      </div>
    </form>
  );
}