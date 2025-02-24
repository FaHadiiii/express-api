const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "express",
  port: 3306,
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Database connected successfully");
  connection.release();
});

module.exports = pool;
