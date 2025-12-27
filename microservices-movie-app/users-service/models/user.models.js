const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === parseInt(id));
}

function addUser(user) {
  const newUser = {
    id: users.length + 1,
    name: user.name,
  };
  users.push(newUser);
  return newUser;
}

function updateUser(id, user) {
  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index !== -1) {
    users[index].name = user.name;
    return users[index];
  }
}

function deleteUser(id) {
  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index !== -1) {
    return index;
  }
  return null;
}

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
