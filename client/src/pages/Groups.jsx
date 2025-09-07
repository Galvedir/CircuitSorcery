import React, { useState, useEffect } from 'react';

export default function Groups({ user, refreshUser }) {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [pendingInvites, setPendingInvites] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = user && user.id ? user.id : null;

  useEffect(() => {
    fetch('http://localhost:5000/api/groups')
      .then(res => res.json())
      .then(setGroups);

    if (userId) {
      fetch(`http://localhost:5000/api/groups/invites?userId=${userId}`)
        .then(res => res.json())
        .then(setPendingInvites);
    }
  }, [userId, user && user.group_id]); // <-- reload groups when group_id changes

  // Assign user to group after creation
  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: groupName })
    });
    if (res.ok) {
      const newGroup = await res.json();
      setGroups([...groups, newGroup]);
      // Assign user to the new group
      const joinRes = await fetch('http://localhost:5000/api/groups/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, groupId: newGroup.id })
      });
      if (joinRes.ok) {
        setMsg('Group created and joined!');
        refreshUser && refreshUser();
      } else {
        setMsg('Group created, but failed to join.');
      }
      setGroupName('');
    } else {
      setMsg('Failed to create group.');
    }
    setLoading(false);
  };

  const handleAcceptInvite = async (inviteId, groupId) => {
    setMsg('');
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/groups/accept-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, inviteId, groupId })
    });
    if (res.ok) {
      setMsg('Joined new group!');
      refreshUser && refreshUser();
      setPendingInvites(pendingInvites.filter(inv => inv.id !== inviteId));
    } else {
      setMsg('Failed to join group.');
    }
    setLoading(false);
  };

  const handleLeave = async () => {
    setMsg('');
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/groups/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (res.ok) {
      setMsg('Left group!');
      refreshUser && refreshUser();
    } else {
      setMsg('Failed to leave group.');
    }
    setLoading(false);
  };

  // Match group by stringified ID to handle type differences
  const userGroup = user && user.group_id
    ? groups.find(g => String(g.id) === String(user.group_id))
    : null;

  if (!userId) {
    return <div>Please log in to manage groups.</div>;
  }

  return (
    <div>
      <h2>Groups</h2>
      {userGroup ? (
        <div>
          <h3>Your Group</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <strong>{userGroup.name}</strong>
            <button onClick={handleLeave} disabled={loading}>Leave Group</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleCreate} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="New group name"
            required
            disabled={loading}
            style={{ marginRight: '0.5rem' }}
          />
          <button type="submit" disabled={loading}>Create Group</button>
        </form>
      )}

      <h3 style={{ marginTop: '2rem' }}>Pending Group Invitations</h3>
      {pendingInvites.length === 0 ? (
        <div style={{ marginBottom: '1rem' }}>No pending invites.</div>
      ) : (
        <ul style={{ marginBottom: '1rem' }}>
          {pendingInvites.map(invite => (
            <li key={invite.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <span>{invite.groupName}</span>
              <button
                onClick={() => handleAcceptInvite(invite.id, invite.groupId)}
                disabled={loading}
              >
                Accept Invite
              </button>
            </li>
          ))}
        </ul>
      )}
      {msg && <div style={{ marginTop: '1rem' }}>{msg}</div>}
    </div>
  );
}