const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const logger = require("./logger");
const mongoose = require("mongoose");

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

// Conexão com o MongoDB
const MONGO_HOST = process.env.MONGO_HOST || "localhost";

mongoose.connect(
    `mongodb://root:pass123@${MONGO_HOST}:27017/moviesdb?authSource=admin`
).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes - CORRIGIDO: importa as rotas do movies-service
app.use("/movies", require("./routes/movies.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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