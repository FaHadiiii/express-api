const express = require("express");
const router = express.Router();
const {
  getJobApplications,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobApplicationController");
const verifyToken = require("../middleware/auth");

// Protected routes (require token)
router.get("/get-job", verifyToken, getJobApplications);
router.post("/create-job", verifyToken, createJobApplication);
router.put("/update-job/:id", verifyToken, updateJobApplication);
router.delete("/delete-job/:id", verifyToken, deleteJobApplication);

module.exports = router;
