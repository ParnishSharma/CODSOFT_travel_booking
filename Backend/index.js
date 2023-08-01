const connecttomongo = require('./db');
const express = require('express');
var cors = require('cors')
require('dotenv').config();


connecttomongo();
const app = express()
const port = 5000
app.use(cors())

app.use(express.json())


app.use('/api/user', require('./routes/auth'))
app.use('/api', require('./routes/login'))



app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`)
})