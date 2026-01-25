const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");


router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/register", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;
