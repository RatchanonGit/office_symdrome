const express = require("express");
const router = express.Router();

const {login}  = require('../controllers/auth')

//midleware
const {auth, adminCheck, currentUser} = require('../middleware/auth')


//@Endpoint  http://localhost:5000/api/login
//@Method    POST
//@Access    Private
router.post('/user/login', login);

//@Endpoint  http://localhost:3000/api/current-user
//@Method    POST
//@Access    Private
router.post("/current-user", auth, currentUser);

//@Endpoint  http://localhost:3000/api/current-admin
//@Method    POST
//@Access    Private
router.post("/current-admin", auth,adminCheck, currentUser);


module.exports = router;