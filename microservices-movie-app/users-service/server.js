const express = require('express')
const app = express()
const port = 5000

// mount routes from routes/user.routes.js
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});