export const defaultApps = [
  { name: 'Cycle Counter', icon: '🌀', to: '/cyclecounter', requireGroup: true },
  { name: 'Text Alerts', icon: '🗨️', to: '/textalerts', requireGroup: true },
];

export const adminApps = [
  ...defaultApps,
  { name: 'User Management', icon: '🛠️', to: '/usermanagement' }
];

import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';

export default function SideMenu({ user }) {
  const apps = user.accountType === 'admin' ? adminApps : defaultApps;
  const inGroup = !!user.group_id;

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

          {/* Groups navigation item */}
          <li key="Groups">
            <NavLink
              to="/groups"
              className={({ isActive }) =>
                isActive ? 'sidebar-item sidebar-active' : 'sidebar-item'
              }
              end
            >
              <span className="sidebar-icon">👥</span>
              <span>Groups</span>
            </NavLink>
          </li>

          {apps.length === 0 ? (
            <li className="sidebar-empty">No apps installed yet.</li>
          ) : (
            apps
              .filter(app => !app.requireGroup || inGroup)
              .map(app => (
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