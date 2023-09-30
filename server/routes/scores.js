const express = require("express");
const router = express.Router();
const { getScores,
        getScoreById,
        addScore,
        removeScore,
        updateScore
} = require('../controllers/scores')

//@Endpoint  http://localhost:5000/api/scores
//@Method    GET
//@Access    Private
router.get('/scores', getScores)

//@Endpoint  http://localhost:5000/api//score/1
//@Method    GET
//@Access    Private
router.get('/score/:id', getScoreById)

//@Endpoint  http://localhost:5000/api/score
//@Method    POST
//@Access    Private
router.post('/score', addScore)

//@Endpoint  http://localhost:5000/api/score/1
//@Method    DELETE
//@Access    Private
router.delete('/score/:id', removeScore)

//@Endpoint  http://localhost:5000/api/score/1
//@Method    PUT
//@Access    Private
router.put('/score/:id',updateScore)

module.exports = router;