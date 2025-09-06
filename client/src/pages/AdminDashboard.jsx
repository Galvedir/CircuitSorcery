import React from 'react';
import { Link } from 'react-router-dom';
import { defaultApps, adminApps } from '../components/SideMenu';

export default function AdminDashboard({ user }) {
  const apps = adminApps;
  return (
    <main style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <div style={{
        marginBottom: '28px', fontSize: '2.1rem', fontWeight: 700, letterSpacing: 1
      }}>
        Dashboard
      </div>
      <div className="card" style={{ minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.25rem', marginBottom: '14px', fontWeight: 600 }}>
          Available Apps
        </div>
        {apps.length === 0 ? (
          <div style={{ fontSize: '1.05rem', color: '#888', textAlign: 'center' }}>
            No apps are installed yet.<br />
            As you add integrations or apps, they’ll appear here!
          </div>
        ) : (
          <ul style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            width: '100%',
            margin: 0,
            padding: 0,
            listStyle: 'none'
          }}>
            {apps.map(app => (
              <li key={app.name} style={{ textAlign: 'center', padding: '0' }}>
                <Link
                  to={app.to}
                  className="card"
                  style={{
                    display: 'block',
                    padding: '20px 0',
                    textDecoration: 'none',
                    color: 'inherit',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px #0002',
                    transition: 'box-shadow 0.18s, background 0.18s',
                    background: '#fff'
                  }}
                >
                  <span style={{ fontSize: '2rem', marginBottom: '8px', display: 'block' }}>{app.icon}</span>
                  <div style={{ fontWeight: 600 }}>{app.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}