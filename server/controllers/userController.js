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