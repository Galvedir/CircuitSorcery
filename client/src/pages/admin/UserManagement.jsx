import React from 'react';

export default function UserManagement() {
  // Replace with real user data fetch later
  const users = [
    { id: 1, username: "admin", accountType: "admin" },
    { id: 2, username: "bob", accountType: "user" },
  ];

  return (
    <div>
      <h2>User Management</h2>
      <table style={{ width: "100%", marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.accountType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}