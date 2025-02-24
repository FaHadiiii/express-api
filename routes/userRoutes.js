const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//user routes
router.get("/get-users", userController.getUser);
router.get("/get-user", userController.getUserById);
router.post("/create-user", userController.createUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);

module.exports = router;
