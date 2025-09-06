import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setMsg(data.message);
      }
    } catch {
      setMsg('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{
      maxWidth: 320, margin: '100px auto', background: 'white', padding: 24, borderRadius: 8, boxShadow: '0 2px 12px #0002'
    }}>
      <h2 style={{ marginBottom: 20 }}>Register</h2>
      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: 10 }} />
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 10 }} />
      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 10 }} />
      <button type="submit" style={{ width: '100%', padding: 8, background: '#282c34', color: 'white', border: 'none', borderRadius: 4 }}>Register</button>
      {msg && <div style={{ color: msg.includes('successful') ? 'green' : 'red', marginTop: 10 }}>{msg}</div>}
      <div style={{ marginTop: 16, fontSize: 14 }}>
        Already have an account? <span style={{ color: '#282c34', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span>
      </div>
    </form>
  );
}