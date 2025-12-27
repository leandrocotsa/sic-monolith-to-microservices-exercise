const express = require('express')
const app = express()
app.use(express.json());

//routes
app.use('/users', require('./routes/user.routes'));

app.listen(3000, () => console.log("Movie App monolith running on port 3000"));