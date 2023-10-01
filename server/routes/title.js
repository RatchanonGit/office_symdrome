const express = require("express");
const router = express.Router();
const { getTitles,
    getTitleById,
    addTitle,
    removeTitle,
    updateTitle
} = require('../controllers/title')

const { auth, adminCheck } = require('../middleware/auth')

//@Endpoint  http://localhost:5000/api/option/titles
//@Method    GET
//@Access    Private
router.get('/option/titles', auth, getTitles)

//@Endpoint  http://localhost:5000/api/option/title/1
//@Method    GET
//@Access    Private
router.get('/option/title/:id',auth, getTitleById)

//@Endpoint  http://localhost:5000/api/option/title
//@Method    POST
//@Access    Private
router.post('/option/title',auth, adminCheck, addTitle)

//@Endpoint  http://localhost:5000/api/option/title/1
//@Method    DELETE
//@Access    Private
router.delete('/option/title/:id',auth, adminCheck, removeTitle)

//@Endpoint  http://localhost:5000/api/option/title/1
//@Method    PUT
//@Access    Private
router.put('/option/title/:id',auth, adminCheck, updateTitle)

module.exports = router;