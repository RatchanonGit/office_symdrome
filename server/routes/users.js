const express = require("express");
const router = express.Router();
const { getUsers,
    getUserById,
    createUser,
    removeUser,
    updateUser,
} = require('../controllers/users')

const {auth,adminCheck} = require('../middleware/auth')


//@Endpoint  http://localhost:5000/api/users
//@Method    GET
//@Access    Private
router.get('/users',auth, getUsers)

//@Endpoint  http://localhost:5000/api//user/1
//@Method    GET
//@Access    Private
router.get('/user/:id',auth, getUserById)

//@Endpoint  http://localhost:5000/api/user/create
//@Method    POST
//@Access    Private
router.post('/user/create',auth, adminCheck, createUser)

// router.post('/user-auth', addUserAndAuth)

//@Endpoint  http://localhost:5000/api/user/1
//@Method    DELETE
//@Access    Private
router.delete('/user/:id',auth, adminCheck, removeUser)

//@Endpoint  http://localhost:5000/api/user/1
//@Method    PUT
//@Access    Private
router.put('/user/:id',auth, adminCheck, updateUser)

module.exports = router;