const express = require("express");
const router = express.Router();
const { getRoles,
    getRoleById,
    addRole,
    removeRole,
    updateRole
} = require('../controllers/role')

const { auth,adminCheck } = require('../middleware/auth')

//@Endpoint  http://localhost:5000/api/option/roles
//@Method    GET
//@Access    Private
router.get('/option/roles', auth, getRoles)

//@Endpoint  http://localhost:5000/api//role/1
//@Method    GET
//@Access    Private
router.get('/option/role/:id',auth, adminCheck, getRoleById)

//@Endpoint  http://localhost:5000/api/option/role
//@Method    POST
//@Access    Private
router.post('/option/role',auth, adminCheck, addRole)

//@Endpoint  http://localhost:5000/api/option/role/1
//@Method    DELETE
//@Access    Private
router.delete('/option/role/:id',auth, adminCheck, removeRole)

//@Endpoint  http://localhost:5000/api/option/role/1
//@Method    PUT
//@Access    Private
router.put('/option/role/:id',auth, adminCheck, updateRole)

module.exports = router;