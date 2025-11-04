const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const logger = require("./logger");

const app = express();

app.use(express.json());

// Middleware de logging para todas as requisições
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    body: req.body,
  }, "Incoming request");
  next();
});

// Routes
app.use("/reviews", require("./routes/reviews.routes"));
app.use("/reviews/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  
  logger.error({
    error: err.message,
    status: status,
    stack: err.stack,
    url: req.url,
    method: req.method,
  }, "Error occurred");

  res.status(status).json({ 
    error: err.message || "Internal Server Error" 
  });
});

module.exports = app;