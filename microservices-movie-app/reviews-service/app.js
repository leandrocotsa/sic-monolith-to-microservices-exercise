const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const MONGO_HOST = process.env.MONGO_HOST || "localhost";

// MongoDB connection
mongoose.connect(
    `mongodb://root:pass123@${MONGO_HOST}:27017/reviewsdb?authSource=admin`
).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/reviews", require("./routes/reviews.routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;