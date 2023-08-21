const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});
const database = async (msg) => {
    let query = `INSERT INTO talabat_bot_users (id, username, first_name, last_name, created_at) VALUES (?, ?, ?, ?, NOW()`;
    console.log(query);
    const [rows, fields] = await pool.execute(query, [msg.from.id, msg.from.username, msg.from.first_name, msg.from.last_name]);
    return rows;
};

module.exports = database;