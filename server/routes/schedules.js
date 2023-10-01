const express = require("express");
const router = express.Router();
const { getSchedules,
    getScheduleById,
    addSchedule,
    removeSchedule,
    updateSchedule
} = require('../controllers/schedules')

const { auth, adminCheck } = require('../middleware/auth')

//@Endpoint  http://localhost:5000/api/schedules
//@Method    GET
//@Access    Private
router.get('/schedules', auth, getSchedules)

//@Endpoint  http://localhost:5000/api/schedule/1
//@Method    GET
//@Access    Private
router.get('/schedule/:id', auth, getScheduleById)

//@Endpoint  http://localhost:5000/api/schedule
//@Method    POST
//@Access    Private
router.post('/schedules', auth, adminCheck, addSchedule)

//@Endpoint  http://localhost:5000/api/schedule/1
//@Method    DELETE
//@Access    Private
router.delete('/schedules/:id', auth, adminCheck, removeSchedule)

//@Endpoint  http://localhost:5000/api/schedule/1
//@Method    PUT
//@Access    Private
router.put('/schedules/:id', auth, adminCheck, updateSchedule)

module.exports = router;