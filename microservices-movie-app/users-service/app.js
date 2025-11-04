const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();
app.use(express.json());

// Routes
app.use("/users", require("./routes/user.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
module.exports = app;
