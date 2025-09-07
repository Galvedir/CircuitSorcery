import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  console.log('API_BASE:', API_BASE);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setMsg(data.message);
      }
    } catch {
      setMsg('Login failed.');
    }
  };

  return (
    <form className="card" onSubmit={handleLogin}>
      <div className="form-title">Sign In</div>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {msg && <div className="form-message" style={{ color: 'red' }}>{msg}</div>}
      <div className="form-footer">
        No account? <a href="/register">Register</a>
      </div>
    </form>
  );
}