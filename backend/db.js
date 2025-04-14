const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,  // e.g., 'localhost'
  user: process.env.DB_USER,  // e.g., 'root'
  password: process.env.DB_PASS, // Your MySQL password
  database: process.env.DB_NAME,  // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

module.exports = db;
