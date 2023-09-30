const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "taskheal",
    password: "nongmeaw1212",
    port: 5432,
})

module.exports = pool;