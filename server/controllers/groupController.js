const db = require('../config/db');
const Group = require('../models/group');
const User = require('../models/user');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    const id = await Group.create({ name });
    res.json({ id, name });
  } catch (err) {
    res.status(400).json({ message: 'Group creation failed.' });
  }
};

exports.listGroups = async (req, res) => {
  try {
    const groups = await Group.listAll();
    res.json(groups);
  } catch (err) {
    res.status(400).json({ message: 'Failed to list groups.' });
  }
};

exports.joinGroup = async (req, res) => {
  const { userId, groupId } = req.body;
  try {
    await Group.addUserToGroup(userId, groupId);
    res.json({ message: 'Joined group.' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to join group.' });
  }
};

exports.leaveGroup = async (req, res) => {
  const { userId } = req.body;
  try {
    await Group.removeUserFromGroup(userId);
    res.json({ message: 'Left group.' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to leave group.' });
  }
};

exports.getUserGroup = async (req, res) => {
  const { userId } = req.params;
  try {
    const userGroupId = await Group.getUserGroupId(userId);
    if (userGroupId) {
      const group = await Group.findById(userGroupId);
      res.json(group);
    } else {
      res.json(null);
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to get user group.' });
  }
};

exports.inviteUser = async (req, res) => {
  const { inviterId, groupId, email } = req.body;
  // Find user by email
  const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (!users.length) return res.status(404).json({ message: 'User not found.' });
  const inviteeId = users[0].id;
  // Check for existing invite
  const [existing] = await db.query(
    'SELECT id FROM group_invites WHERE invitee_id = ? AND group_id = ? AND status = "pending"',
    [inviteeId, groupId]
  );
  if (existing.length) return res.status(400).json({ message: 'Invite already exists.' });
  // Create invite
  await db.query(
    'INSERT INTO group_invites (inviter_id, invitee_id, group_id, status) VALUES (?, ?, ?, "pending")',
    [inviterId, inviteeId, groupId]
  );
  res.json({ message: 'Invite sent.' });
};

exports.listInvites = async (req, res) => {
  const { userId } = req.query;
  const [invites] = await db.query(
    `SELECT gi.id, gi.group_id AS groupId, g.name AS groupName, gi.status
     FROM group_invites gi
     JOIN groups g ON gi.group_id = g.id
     WHERE gi.invitee_id = ? ORDER BY gi.id DESC`,
    [userId]
  );
  res.json(invites);
};

exports.acceptInvite = async (req, res) => {
  const { userId, inviteId, groupId } = req.body;
  // Mark invite as accepted
  await db.query('UPDATE group_invites SET status = "accepted" WHERE id = ?', [inviteId]);
  // Assign user to group
  await db.query('UPDATE users SET group_id = ? WHERE id = ?', [groupId, userId]);
  res.json({ message: 'Invite accepted and group assigned.' });
};

exports.denyInvite = async (req, res) => {
  const { inviteId } = req.body;
  await db.query('UPDATE group_invites SET status = "denied" WHERE id = ?', [inviteId]);
  res.json({ message: 'Invite denied.' });
};