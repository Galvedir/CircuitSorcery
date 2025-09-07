const db = require('../config/db');

const Group = {
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM groups WHERE id = ?', [id]);
    return rows[0];
  },
  async findByName(name) {
    const [rows] = await db.query('SELECT * FROM groups WHERE name = ?', [name]);
    return rows[0];
  },
  async create({ name }) {
    const [result] = await db.query(
      'INSERT INTO groups (name) VALUES (?)',
      [name]
    );
    return result.insertId;
  },
  async listAll() {
    const [rows] = await db.query('SELECT * FROM groups');
    return rows;
  },
  async addUserToGroup(userId, groupId) {
    await db.query('UPDATE users SET group_id = ? WHERE id = ?', [groupId, userId]);
  },
  async removeUserFromGroup(userId) {
    await db.query('UPDATE users SET group_id = NULL WHERE id = ?', [userId]);
  },
  async getUserGroupId(userId) {
    const [rows] = await db.query('SELECT group_id FROM users WHERE id = ?', [userId]);
    return rows[0] ? rows[0].group_id : null;
  }
};

module.exports = Group;