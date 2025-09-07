import React, { useEffect, useState } from 'react';

export default function GroupManagement() {
  const [groups, setGroups] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '' });
  const [newGroupName, setNewGroupName] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/groups')
      .then(res => res.json())
      .then(setGroups);
  }, []);

  const startEdit = (group) => {
    setEditingId(group.id);
    setEditData({ name: group.name });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '' });
  };

  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/api/groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    });
    if (res.ok) {
      setGroups(groups.map(g => g.id === id ? { ...g, ...editData } : g));
      cancelEdit();
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setMsg('');
    const res = await fetch('http://localhost:5000/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGroupName })
    });
    if (res.ok) {
      const newGroup = await res.json();
      setGroups([...groups, newGroup]);
      setMsg('Group created!');
      setNewGroupName('');
    } else {
      setMsg('Failed to create group.');
    }
  };

  return (
    <div>
      <h2>Group Management</h2>
      <form onSubmit={handleCreateGroup} style={{ marginBottom: 24 }}>
        <input
          type="text"
          value={newGroupName}
          onChange={e => setNewGroupName(e.target.value)}
          placeholder="New group name"
          required
          className="form-control"
          style={{ marginRight: 8, width: 220 }}
        />
        <button type="submit" className="btn">Create Group</button>
        {msg && <span style={{ marginLeft: 16, color: msg.includes('Fail') ? 'red' : 'green' }}>{msg}</span>}
      </form>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px' }}>ID</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Created At</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(g => (
            <tr key={g.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{g.id}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                {editingId === g.id ? (
                  <input
                    value={editData.name}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  g.name
                )}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{g.created_at}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                {editingId === g.id ? (
                  <>
                    <button className="btn" onClick={() => saveEdit(g.id)} style={{ marginRight: 8 }}>Save</button>
                    <button className="btn" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button className="btn" onClick={() => startEdit(g)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}