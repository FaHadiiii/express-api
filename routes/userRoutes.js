const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/auth");
const authController = require("../controllers/authController");

// Public routes (if any)
// router.post("/create-user", authController.register);

// Protected routes (require token)
router.get("/get-users", verifyToken, getUser);
router.get("/get-user", verifyToken, getUserById);
router.put("/update-user/:id", verifyToken, updateUser);
router.delete("/delete-user/:id", verifyToken, deleteUser);

module.exports = router;
