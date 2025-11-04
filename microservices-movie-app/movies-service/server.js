const app = require("./app");
const logger = require("./logger");

const PORT = 5001;

app.listen(PORT, () => {
  logger.info({ port: PORT, service: 'movies-service' }, `Server running on port http://localhost:${PORT}`);
});

