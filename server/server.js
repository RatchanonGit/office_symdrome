const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config();
const { readdirSync } = require('fs')

// รับข้อมูล JSON ขนาดสูงสุดเป็น 50MB
app.use(express.json({ limit: '50mb' }));

// รับข้อมูลแบบ URL-encoded ขนาดสูงสุดเป็น 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//middleware
app.use(morgan('dev'))

// รับข้อมูล JSON ขนาดสูงสุดเป็น 50MB
app.use(bodyParser.json({ limit: '50mb' }));

// รับข้อมูลแบบ URL-encoded ขนาดสูงสุดเป็น 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

readdirSync('./routes')
    .map((r) => app.use('/api', require('./routes/' + r)))

const port = process.env.PORT
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

