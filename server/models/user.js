const db = require('../config/db');

const User = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ name, email, password_hash }) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, accountType) VALUES (?, ?, ?, ?)',
      [name, email, password_hash, "user"]
    );
    return result.insertId;
  },
  async updatePassword(id, password_hash) {
    await db.query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [password_hash, id]
    );
  },
  async updateProfile(id, name) {
    await db.query(
      'UPDATE users SET name = ? WHERE id = ?',
      [name, id]
    );
  }
};

module.exports = User;