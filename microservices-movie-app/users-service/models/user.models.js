const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find(u => u.id === parseInt(id));
}

module.exports = { getAllUsers, getUserById };