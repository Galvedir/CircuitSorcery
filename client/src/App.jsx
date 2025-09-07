import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import RequireAdmin from './components/RequireAdmin';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import Groups from './pages/Groups';

function RequireAuth({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persist user on login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Persist user on logout
  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  // Load user from localStorage on app load
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  // Function to refresh user data from backend/localStorage
  const refreshUser = async () => {
    if (!user || !user.id) return;
    const res = await fetch(`http://localhost:5000/api/users/${user.id}`);
    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const location = useLocation();
  const hideSideMenu = ['/login', '/register'].includes(location.pathname);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <TopBar user={user} onSignOut={handleSignOut} />
      <div style={{ display: 'flex', flex: 1 }}>
        {!hideSideMenu && user && <SideMenu user={user} />}
        <main style={{ flex: 1, padding: '2rem', background: '#f7f7fa' }}>
          <Routes>
            <Route path="/login" element={<Login setUser={handleLogin} />} />
            <Route path="/register" element={<Register setUser={handleLogin} />} />

            <Route
              path="/dashboard"
              element={
                <RequireAuth user={user}>
                  <Dashboard user={user} />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth user={user}>
                  <Profile user={user} setUser={setUser} />
                </RequireAuth>
              }
            />
            <Route
              path="/"
              element={
                <RequireAuth user={user}>
                  <div>Welcome to Circuit Sorcery!</div>
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAdmin user={user}>
                  <AdminDashboard user={user} />
                </RequireAdmin>
              }
            />
            <Route
              path="/usermanagement"
              element={
                <RequireAdmin user={user}>
                  <UserManagement />
                </RequireAdmin>
              }
            />
            <Route
              path="/groups"
              element={
                <Groups
                  user={user}
                  refreshUser={refreshUser}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}