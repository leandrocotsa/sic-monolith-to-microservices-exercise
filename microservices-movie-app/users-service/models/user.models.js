const users = [
  { id: 1, name: "Alice", email: "example@gmail.com" },
  { id: 2, name: "Bob", email: "example2@gmail.com" },
];

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === parseInt(id));
}

function addUser(user) {
  if (users.find((u) => u.email === user.email)) {
    return null; // Email already exists
  }
  const newUser = {
    id: users.length + 1,
    name: user.name,
    email: user.email,
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
