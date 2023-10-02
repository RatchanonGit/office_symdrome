const express = require("express");
const router = express.Router();
const { getScores,
    getScoreById,
    addScore,
    removeScore,
    updateScore,
    getSumScoreAndSumtime,
    getScoreLimitDate
} = require('../controllers/scores')

const { auth, adminCheck } = require('../middleware/auth')

//@Endpoint  http://localhost:5000/api/user/scores
//@Method    GET
//@Access    Private
router.get('/user/scores', auth, getScores)

//@Endpoint  http://localhost:5000/api/user/score/1
//@Method    GET
//@Access    Private
router.get('/user/score/:id', auth, getScoreById)

router.get('/score/:id',auth, getSumScoreAndSumtime)

router.get('/score/user_scores/:id',auth, getScoreLimitDate)

//@Endpoint  http://localhost:5000/api/user/score
//@Method    POST
//@Access    Private
router.post('/user/score', auth, adminCheck, addScore)

//@Endpoint  http://localhost:5000/api/user/score/1
//@Method    DELETE
//@Access    Private
router.delete('/user/score/:id', auth, adminCheck, removeScore)

//@Endpoint  http://localhost:5000/api/user/score/1
//@Method    PUT
//@Access    Private
router.put('/score/:id', auth, adminCheck, updateScore)



module.exports = router;