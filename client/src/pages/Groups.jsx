import React, { useState, useEffect } from 'react';

export default function Groups({ user, refreshUser }) {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [pendingInvites, setPendingInvites] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMsg, setInviteMsg] = useState('');

  const userId = user && user.id ? user.id : null;

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/groups`)
      .then(res => res.json())
      .then(setGroups);

    if (userId) {
      fetch(`${API_BASE}/api/groups/invites?userId=${userId}`)
        .then(res => res.json())
        .then(setPendingInvites);
    }
  }, [userId, user && user.group_id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: groupName })
    });
    if (res.ok) {
      const newGroup = await res.json();
      setGroups([...groups, newGroup]);
      const joinRes = await fetch(`${API_BASE}/api/groups/join`, {
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
    const res = await fetch(`${API_BASE}/api/groups/accept-invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, inviteId, groupId })
    });
    if (res.ok) {
      setMsg('Joined new group!');
      refreshUser && refreshUser();
      setPendingInvites(pendingInvites.map(inv =>
        inv.id === inviteId ? { ...inv, status: 'accepted' } : inv
      ));
    } else {
      setMsg('Failed to join group.');
    }
    setLoading(false);
  };

  const handleDenyInvite = async (inviteId) => {
    setMsg('');
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/groups/deny-invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, inviteId })
    });
    if (res.ok) {
      setMsg('Invite denied.');
      setPendingInvites(pendingInvites.map(inv =>
        inv.id === inviteId ? { ...inv, status: 'denied' } : inv
      ));
    } else {
      setMsg('Failed to deny invite.');
    }
    setLoading(false);
  };

  const handleLeave = async () => {
    setMsg('');
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/groups/leave`, {
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

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteMsg('');
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/groups/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviterId: userId, groupId: user.group_id, email: inviteEmail })
    });
    if (res.ok) {
      setInviteMsg('Invite sent!');
      setInviteEmail('');
      fetch(`${API_BASE}/api/groups/invites?userId=${userId}`)
        .then(res => res.json())
        .then(setPendingInvites);
    } else {
      const data = await res.json();
      setInviteMsg(data.message || 'Failed to send invite.');
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
          {/* Invite form */}
          <form onSubmit={handleInvite} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="Invite by email"
              required
              disabled={loading}
              className="form-control"
              style={{ width: 220 }}
            />
            <button type="submit" disabled={loading} className="btn">Invite</button>
            {inviteMsg && <span style={{ marginLeft: 8, color: inviteMsg.includes('Fail') ? 'red' : 'green' }}>{inviteMsg}</span>}
          </form>
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
            className="form-control"
          />
          <button type="submit" disabled={loading} className="btn">Create Group</button>
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
              <span>Status: {invite.status || 'pending'}</span>
              {invite.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleAcceptInvite(invite.id, invite.groupId)}
                    disabled={loading}
                    className="btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDenyInvite(invite.id)}
                    disabled={loading}
                    className="btn"
                  >
                    Deny
                  </button>
                </>
              )}
              {invite.status === 'accepted' && (
                <span style={{ color: 'green' }}>Accepted</span>
              )}
              {invite.status === 'denied' && (
                <span style={{ color: 'red' }}>Denied</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {msg && <div style={{ marginTop: '1rem' }}>{msg}</div>}
    </div>
  );
}