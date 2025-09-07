import React, { useEffect, useState } from 'react';

export default function UserManagement() {
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ username: '', email: '', accountType: '', group_id: null });

  useEffect(() => {
    fetch(`${API_BASE}/api/users`)
      .then(res => res.json())
      .then(setUsers);

    fetch(`${API_BASE}/api/groups`)
      .then(res => res.json())
      .then(setGroups);
  }, []);

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditData({
      username: user.username,
      email: user.email,
      accountType: user.accountType,
      group_id: user.group_id || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ username: '', email: '', accountType: '', group_id: null });
  };

  const saveEdit = async (id) => {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    });
    if (res.ok) {
      setUsers(users.map(u => u.id === id ? { ...u, ...editData } : u));
      cancelEdit();
    }
  };

  const getGroupName = (group_id) => {
    const group = groups.find(g => String(g.id) === String(group_id));
    return group ? group.name : 'No group';
  };

  return (
    <div>
      <h2>User Management</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px' }}>ID</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Username</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Account Type</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Group</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{u.id}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                {editingId === u.id ? (
                  <input
                    value={editData.username}
                    onChange={e => setEditData({ ...editData, username: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  u.username
                )}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                {editingId === u.id ? (
                  <input
                    value={editData.email}
                    onChange={e => setEditData({ ...editData, email: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  u.email
                )}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                {editingId === u.id ? (
                  <select
                    value={editData.accountType}
                    onChange={e => setEditData({ ...editData, accountType: e.target.value })}
                    className="form-control"
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                ) : (
                  u.accountType
                )}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                {editingId === u.id ? (
                  <select
                    value={editData.group_id}
                    onChange={e => setEditData({ ...editData, group_id: e.target.value })}
                    className="form-control"
                  >
                    <option value="">No group</option>
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                ) : (
                  getGroupName(u.group_id)
                )}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                {editingId === u.id ? (
                  <>
                    <button className="btn" onClick={() => saveEdit(u.id)} style={{ marginRight: 8 }}>Save</button>
                    <button className="btn" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button className="btn" onClick={() => startEdit(u)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}