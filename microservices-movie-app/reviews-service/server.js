const app = require("./app");
const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/reviews`);
});
