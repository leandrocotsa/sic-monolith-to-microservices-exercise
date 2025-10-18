const express = require("express");
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

app.get("/users", (req, res) => res.json(users));

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

app.listen(3003, () => console.log("Users service running on port 3003"));
