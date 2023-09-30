const express = require("express");
const router = express.Router();
const { getTitles,
    getTitleById,
    addTitle,
    removeTitle,
    updateTitle
} = require('../controllers/title')

const { auth, adminCheck } = require('../middleware/auth')
//@Endpoint  http://localhost:5000/api/titles
//@Method    GET
//@Access    Private
router.get('/titles', auth, adminCheck, getTitles)

//@Endpoint  http://localhost:5000/api//title/1
//@Method    GET
//@Access    Private
router.get('/title/:id', getTitleById)

//@Endpoint  http://localhost:5000/api/title
//@Method    POST
//@Access    Private
router.post('/title', addTitle)

//@Endpoint  http://localhost:5000/api/title/1
//@Method    DELETE
//@Access    Private
router.delete('/title/:id',auth, adminCheck, removeTitle)

//@Endpoint  http://localhost:5000/api/title/1
//@Method    PUT
//@Access    Private
router.put('/title/:id', updateTitle)

module.exports = router;