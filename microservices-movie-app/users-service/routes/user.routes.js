const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const { authenticateToken, checkAdminRole, checkUserId } = require("../middleware/jwtAuth");


router.get("/", authenticateToken, checkAdminRole, userController.getUsers);
router.get("/:id", authenticateToken, checkUserId, userController.getUser);
router.post("/register", userController.createUser);
router.put("/:id", authenticateToken, checkUserId, userController.updateUser);
router.delete("/:id", authenticateToken, checkUserId, userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;
