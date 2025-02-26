const conn = require("../config/db");

const userController = {
  getUserById: (req, res) => {
    const id = req.query.id;
    const query = "SELECT * FROM User WHERE id = ?";
    conn.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      } else {
        if (results.length === 0) {
          return res.status(404).json({
            status: "error",
            message: "User not found",
          });
        }
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    });
  },

  getUser: (req, res) => {
    const query = "SELECT * FROM User WHERE deleted_at IS NULL";
    conn.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.error(err.sqlMessage, res);
      } else {
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    });
  },

  updateUser: (req, res) => {
    const id = req.params.id;
    const { name, age, job } = req.body;

    const query = "UPDATE User SET name = ?, age = ?, job = ? WHERE id = ?";
    const values = [name, age, job, id];

    conn.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            name: name,
            age: age,
            job: job,
          },
        });
      }
    });
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    const query = "UPDATE User SET deleted_at = NOW() WHERE id = ?";
    conn.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            id: id,
          },
        });
      }
    });
  },
};

module.exports = userController;
