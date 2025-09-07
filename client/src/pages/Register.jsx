import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    if (password !== confirmPassword) {
      setMsg('Passwords do not match.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setMsg(data.message);
      }
    } catch {
      setMsg('Registration failed.');
    }
  };

  return (
    <form className="card" onSubmit={handleRegister}>
      <div className="form-title">Register</div>
      <div className="form-group">
        <label htmlFor="register-name">Name</label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          id="register-confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
      {msg && <div className="form-message" style={{ color: msg.includes("successful") ? "green" : "red" }}>{msg}</div>}
      <div className="form-footer">
        Already have an account? <a href="/login">Login</a>
      </div>
    </form>
  );
}