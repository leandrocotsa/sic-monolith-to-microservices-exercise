const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

// Controlador para obter todos os utilizadores
function getUsers(req, res) {
  /*
 #swagger.tags = ['Users']
 #swagger.responses[200] = { description: 'Users fetched successfully', schema: {
$ref: '#/definitions/GetUsers'} } */
  const users = userModel.getAllUsers();
  res.status(200).json(users);
}

// Controlador para obter um utilizador por ID
function getUser(req, res) {
  /*
 #swagger.tags = ['Users']
 #swagger.responses[200] = { description: 'User fetched successfully', schema: {
$ref: '#/definitions/GetUser'} }
 #swagger.responses[404] = { description: 'User not found' }
 */
  const user = userModel.getUserById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}

function createUser(req, res) {
  /*
 #swagger.tags = ['Users']
 #swagger.parameters['body'] = {
 in: 'body',
 description: 'New user object',
 required: true,
 schema: { $ref: '#/definitions/CreateUser' }
 }
 #swagger.responses[201] = { description: 'User created successfully', schema: {
$ref: '#/definitions/GetUser'} }
 #swagger.responses[409] = { description: 'Email already exists' }
 */
  const newUser = userModel.addUser(req.body);
  if (!newUser) {
    return res.status(409).json({ error: "Email already exists" });
  }
  res.status(201).json(newUser, "User created successfully");
}

function updateUser(req, res) {
  /*
 #swagger.tags = ['Users']
 #swagger.parameters['body'] = {
 in: 'body',
 description: 'Update user object',
 required: true,
 schema: { $ref: '#/definitions/UpdateUser' }
 }
 #swagger.responses[200] = { description: 'User updated successfully', schema: {
$ref: '#/definitions/UpdateUser'} }
 #swagger.responses[404] = { description: 'User not found' }
 */
  const updatedUser = userModel.updateUser(req.params.id, req.body);
  if (updatedUser) {
    res.status(200).json(updatedUser, "User updated successfully");
  } else {
    res.status(404).json({ error: "User not found" });
  }
}

function deleteUser(req, res) {
  /*
 #swagger.tags = ['Users']
 #swagger.parameters['body'] = {
 in: 'body',
 description: 'Delete user object',
 required: true,
 schema: { $ref: '#/definitions/DeleteUser' }
 }
 #swagger.responses[200] = { description: 'User deleted successfully', schema: {
$ref: '#/definitions/DeleteUser'} }
 #swagger.responses[404] = { description: 'User not found' }
 */
  const deletedUser = userModel.deleteUser(req.params.id);
  if (deletedUser) {
    res.status(200).json("User deleted successfully");
  } else {
    res.status(404).json({ error: "User not found" });
  }
}


function loginUser(req, res) {
  const { email, password } = req.body;
  const user = userModel.getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    "secret",
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, loginUser };
