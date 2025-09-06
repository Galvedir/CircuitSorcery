export const defaultApps = [
  { name: 'Cycle Counter', icon: '🌀', to: '/cyclecounter' },
  { name: 'Text Alerts', icon: '🗨️', to: '/textalerts' },
];

export const adminApps = [
  ...defaultApps,
  { name: 'User Management', icon: '🛠️', to: '/usermanagement' }
];

import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';

export default function SideMenu({ user }) {
  const apps = user.accountType === 'admin' ? adminApps : defaultApps
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Menu</div>
      <nav>
        <ul className="sidebar-list">
          {user.accountType === 'admin' ? 

            <li key="AdminDashboard">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? 'sidebar-item sidebar-active' : 'sidebar-item'
                }
                end
              >
                <span className="sidebar-icon">📊</span>
                <span>Admin Dashboard</span>
              </NavLink>
            </li>

            :

            <li key="Dashboard">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'sidebar-item sidebar-active' : 'sidebar-item'
                }
                end
              >
                <span className="sidebar-icon">📊</span>
                <span>Dashboard</span>
              </NavLink>
            </li>
        
          }
          
          {apps.length === 0 ? (
            <li className="sidebar-empty">No apps installed yet.</li>
          ) : (
            apps.map(app => (
              <li key={app.name}>
                <NavLink
                  to={app.to}
                  className={({ isActive }) =>
                    isActive ? 'sidebar-item sidebar-active' : 'sidebar-item'
                  }
                  end
                >
                  {app.icon && <span className="sidebar-icon">{app.icon}</span>}
                  <span>{app.name}</span>
                </NavLink>
              </li>
            ))
          )}
        </ul>
      </nav>
    </aside>
  );
}