const express = require("express");

const app = express();
app.use(express.json());

// Routes
app.use("/reviews", require("./routes/reviews.routes"));

module.exports = app;
