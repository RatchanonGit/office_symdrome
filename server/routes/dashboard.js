const express = require("express");
const router = express.Router();
const {
    getSumUser,
    getSumScore,
    getSumTime,
    getSumScoreLimitDate,
    getSumUserOnInstitution,
    getTopTenScore
} = require('../controllers/dashboard')
const { auth} = require('../middleware/auth')


router.get('/dashboard/sum-user', auth, getSumUser)

router.get('/dashboard/sum-score', auth, getSumScore)
router.get('/dashboard/sum-time', auth, getSumTime)
router.get('/dashboard/score-limit-date', auth, getSumScoreLimitDate)
router.get('/dashboard/user-on-institution', auth, getSumUserOnInstitution)
router.get('/dashboard/topten', auth, getTopTenScore)

module.exports = router;