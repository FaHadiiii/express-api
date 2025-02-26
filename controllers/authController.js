const jwt = require("jsonwebtoken");
const conn = require("../config/db");
const bcrypt = require("bcrypt");

// Same secret as in auth middleware
const JWT_SECRET = "your_jwt_secret_key";

const authController = {
  login: (req, res) => {
    const { username, password } = req.body;

    // Get user from database by username
    const query = "SELECT * FROM User WHERE username = ?";

    conn.query(query, [username], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          status: "error",
          message: "Invalid credentials",
        });
      }

      const user = results[0];

      // Compare submitted password with stored hash
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Password verification failed",
          });
        }

        if (!isMatch) {
          return res.status(401).json({
            status: "error",
            message: "Invalid credentials",
          });
        }

        // Generate token
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          status: "success",
          message: "Login successful",
          token,
        });
      });
    });
  },

  register: (req, res) => {
    const { username, password, name, age, job } = req.body;

    // Check if username already exists
    const checkQuery = "SELECT * FROM User WHERE username = ?";

    conn.query(checkQuery, [username], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Username already exists",
        });
      }

      // Hash the password (10 rounds of salting)
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Password hashing failed",
          });
        }

        // Insert new user with hashed password
        const insertQuery =
          "INSERT INTO User (username, password, name, age, job) VALUES (?, ?, ?, ?, ?)";

        conn.query(
          insertQuery,
          [username, hashedPassword, name, age, job],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                status: "error",
                message: err.sqlMessage,
              });
            }

            res.status(201).json({
              status: "success",
              message: "User registered successfully",
              data: {
                id: results.insertId,
                username,
                name,
                age,
                job,
              },
            });
          }
        );
      });
    });
  },
};

module.exports = authController;
