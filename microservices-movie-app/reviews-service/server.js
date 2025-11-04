const app = require("./app");
const logger = require("./logger");
const PORT = 5002;

app.listen(PORT, () => {
  logger.info("Server started");
  console.log(`Server running on port http://localhost:${PORT}/reviews`);
});
