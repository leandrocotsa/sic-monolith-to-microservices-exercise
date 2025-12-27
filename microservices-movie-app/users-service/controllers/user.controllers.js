const userModel = require("../models/user.models");

// Controlador para obter todos os utilizadores
function getUsers(req, res) {
  const users = userModel.getAllUsers();
  res.json(users);
}

// Controlador para obter um utilizador por ID
function getUser(req, res) {
  const user = userModel.getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}

function createUser(req, res) {
  const newUser = userModel.addUser(req.body);
  res.status(201).json(newUser);
}

function updateUser(req, res) {
  const updatedUser = userModel.updateUser(req.params.id, req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}

function deleteUser(req, res) {
  const deletedUser = userModel.deleteUser(req.params.id);
  if (deletedUser) {
    res.json("User deleted successfully");
  } else {
    res.status(404).json({ error: "User not found" });
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
