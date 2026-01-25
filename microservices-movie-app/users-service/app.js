const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user.models");

// Use environment variable when available for security
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const app = express();
app.use(express.json());


// Routes
app.use("/users", require("./routes/user.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const user = userModel.getUserByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.status(200).json({ token });
});
module.exports = app;
