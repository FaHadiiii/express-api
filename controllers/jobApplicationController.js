const conn = require("../config/db");

const jobApplicationController = {
  getJobApplications: (req, res) => {
    const id = req.query.id;
    const query =
      "SELECT * FROM job_applications WHERE user_id = ? AND deleted_at IS NULL";
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
            message: "Job application not found",
          });
        }
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    });
  },

  createJobApplication: (req, res) => {
    const { user_id, job_title, company, status_id, notes } = req.body;
    const query =
      "INSERT INTO job_applications (user_id, job_title, company, status_id, notes) VALUES (?, ?, ?, ?, ?)";
    const values = [user_id, job_title, company, status_id, notes];

    conn.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      }
      res.status(201).json({
        status: "success",
        data: {
          id: results.insertId,
          user_id,
          job_title,
          company,
          status_id,
          notes,
        },
      });
    });
  },

  updateJobApplication: (req, res) => {
    const id = req.params.id;
    const { job_title, company, status_id, notes } = req.body;

    console.log(job_title, company, status_id, notes, id);

    const query =
      "UPDATE job_applications SET job_title = ?, company = ?, status_id = ?, notes = ? WHERE id = ?";
    const values = [job_title, company, status_id, notes, id];

    conn.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      } else {
        if (results.affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: `No job application found with ID ${id}`,
          });
        }

        res.status(200).json({
          status: "success",
          data: {
            job_title: job_title,
            company: company,
            status_id: status_id,
            notes: notes,
          },
        });
      }
    });
  },

  deleteJobApplication: (req, res) => {
    const id = req.params.id;
    const query = "UPDATE job_applications SET deleted_at = NOW() WHERE id = ?";
    conn.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
      } else {
        if (results.affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: `No job application found with ID ${id}`,
          });
        }

        res.status(200).json({
          status: "success",
          data: {
            id: id,
            deleted_at: new Date(),
          },
        });
      }
    });
  },
};

module.exports = jobApplicationController;
