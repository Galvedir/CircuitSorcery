const Group = require('../models/group');

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