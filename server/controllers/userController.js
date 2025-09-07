const User = require('../models/user');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, accountType: user.accountType, group_id: user.group_id });
};

exports.updateProfile = async (req, res) => {
  const { name } = req.body;
  await User.updateProfile(req.user.id, name);
  res.json({ message: 'Profile updated' });
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.listAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, accountType } = req.body;
  try {
    await User.updateById(id, { username, accountType });
    res.json({ message: 'User updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user.' });
  }
};