//Import
var cors = require('cors')
const express = require('express')
const route = require('./routes/site')
//database
const db = require('./config/database')
db.connect()

const app = express()

app.use(cors());
app.use('/', route)

const PORT = 5000

app.listen(PORT, () => console.log('Server started on port ${PORT}'))