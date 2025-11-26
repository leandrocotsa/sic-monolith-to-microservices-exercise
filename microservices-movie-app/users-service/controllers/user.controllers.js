const { getAllUsers, getUserById } = require('../models/user.models');

// Controlador para obter todos os utilizadores
function getUsers(req, res) {
    const users = getAllUsers();
    res.json(users);
}

// Controlador para obter um utilizador por ID
function getUser(req, res) {
    const user = getUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
}

module.exports = { getUsers, getUser };