const express = require("express");
const router = express.Router();
const {
  login,
  register,
  resetPassword,
} = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/reset-password", verifyToken, resetPassword);

module.exports = router;
