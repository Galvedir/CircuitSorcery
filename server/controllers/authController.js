const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtConfig = require('../config/jwt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email, accountType: user.accountType }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, accountType: user.accountType } });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findByEmail(email);
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const password_hash = await bcrypt.hash(password, 10);
  const id = await User.create({ name, email, password_hash });
  res.json({ id, name, email });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const password_hash = await bcrypt.hash(newPassword, 10);
  await User.updatePassword(user.id, password_hash);
  res.json({ message: 'Password updated' });
};