import React from 'react';
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

// Reusable authentication wrapper
function RequireAuth({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

// This is a wrapper so we can use useLocation outside of <Router>
function AppWrapper() {
  const [user, setUser] = React.useState(null);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const location = useLocation();
  // Hide SideMenu on login/register routes
  const hideSideMenu = ['/login', '/register'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <TopBar user={user} onSignOut={handleSignOut} />
      <div style={{ display: 'flex', flex: 1 }}>
        {!hideSideMenu && user && <SideMenu user={user} />}
        <main style={{ flex: 1, padding: '2rem', background: '#f7f7fa' }}>
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />

            {/* Protected routes */}
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

            {/* Home route */}
            <Route
              path="/"
              element={
                <RequireAuth user={user}>
                  <div>Welcome to Circuit Sorcery!</div>
                </RequireAuth>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <RequireAdmin user={user}>
                  <AdminDashboard />
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