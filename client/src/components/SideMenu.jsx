import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';

const defaultApps = [
  { name: 'Dashboard', icon: '📊', to: '/' },
  { name: 'My Circuits', icon: '🧩', to: '/circuits' },
  { name: 'Marketplace', icon: '🛒', to: '/marketplace' }
];

export default function SideMenu({ apps = defaultApps }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">CircuitSorcery</div>
      <nav>
        <ul className="sidebar-list">
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