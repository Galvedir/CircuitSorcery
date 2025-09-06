import React from 'react';

export default function SideMenu() {
  // Eventually, you’ll map over your “apps” array here.
  // For now, keep this empty or show a message.
  return (
    <nav style={{
      width: 220, background: '#363b4c', color: 'white', paddingTop: 20, minHeight: 'calc(100vh - 60px)'
    }}>
      <div style={{ padding: '1rem', color: '#aaa', fontStyle: 'italic' }}>
        No apps installed yet.
      </div>
      {/* Future apps will be listed here */}
    </nav>
  );
}