const express = require("express");
const router = express.Router();
const { getRoles,
    getRoleById,
    addRole,
    removeRole,
    updateRole
} = require('../controllers/role')

const { auth,adminCheck } = require('../middleware/auth')

//@Endpoint  http://localhost:5000/api/roles
//@Method    GET
//@Access    Private
router.get('/roles', auth,adminCheck, getRoles)

//@Endpoint  http://localhost:5000/api//role/1
//@Method    GET
//@Access    Private
router.get('/role/:id', getRoleById)

//@Endpoint  http://localhost:5000/api/role
//@Method    POST
//@Access    Private
router.post('/role', addRole)

//@Endpoint  http://localhost:5000/api/role/1
//@Method    DELETE
//@Access    Private
router.delete('/role/:id', removeRole)

//@Endpoint  http://localhost:5000/api/role/1
//@Method    PUT
//@Access    Private
router.put('/role/:id', updateRole)

module.exports = router;