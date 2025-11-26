const express = require("express");

const app = express();
app.use(express.json());

// Routes
app.use("/movies", require("./routes/movies.routes"));

module.exports = app;
