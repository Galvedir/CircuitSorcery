import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
        <TopBar user={user} setUser={setUser} />
        <div style={{ display: 'flex', flex: 1 }}>
          <SideMenu />
          <main style={{ flex: 1, padding: '2rem', background: '#f7f7fa' }}>
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
              <Route path="/" element={user ? <div>Welcome to Circuit Sorcery!</div> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;