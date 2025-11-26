const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user.models");
const mongoose = require("mongoose");

// Use environment variable when available for security
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const app = express();
app.use(express.json());

// MongoDB connection
const MONGO_HOST = process.env.MONGO_HOST || "localhost";

mongoose.connect(
    `mongodb://root:pass123@${MONGO_HOST}:27017/usersdb?authSource=admin`
).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", require("./routes/user.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
