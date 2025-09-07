const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '45.141.24.140',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'energy',
  database: process.env.DB_NAME || 'circuitsorcery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: process.env.DB_PORT || 3306
});

module.exports = pool;