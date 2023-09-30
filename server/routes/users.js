const express = require("express");
const router = express.Router();
const { getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
    register,
} = require('../controllers/users')

const {auth,adminCheck} = require('../middleware/auth')


//@Endpoint  http://localhost:5000/api/users
//@Method    GET
//@Access    Private
router.get('/users', getUsers)

//@Endpoint  http://localhost:5000/api//user/1
//@Method    GET
//@Access    Private
router.get('/user/:id', getUserById)

//@Endpoint  http://localhost:5000/api/user
//@Method    POST
//@Access    Private
router.post('/createuser', addUser)

router.post('/register',auth, adminCheck, register)

// router.post('/user-auth', addUserAndAuth)

//@Endpoint  http://localhost:5000/api/user/1
//@Method    DELETE
//@Access    Private
router.delete('/user/:id', removeUser)

//@Endpoint  http://localhost:5000/api/user/1
//@Method    PUT
//@Access    Private
router.put('/user/:id', updateUser)

module.exports = router;