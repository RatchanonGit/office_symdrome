const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config();
const { readdirSync } = require('fs')

app.use(express.json());

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '20mb' }))
app.use(cors())

readdirSync('./routes')
    .map((r) => app.use('/api', require('./routes/' + r)))

const port = process.env.PORT
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

