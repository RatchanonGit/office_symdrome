const express = require("express");
const router = express.Router();
const { getSchedules,
        getScheduleById,
        addSchedule,
        removeSchedule,
        updateSchedule
} = require('../controllers/schedules')

//@Endpoint  http://localhost:5000/api/schedules
//@Method    GET
//@Access    Private
router.get('/schedules', getSchedules)

//@Endpoint  http://localhost:5000/api//schedule/1
//@Method    GET
//@Access    Private
router.get('/schedule/:id', getScheduleById)

//@Endpoint  http://localhost:5000/api/schedule
//@Method    POST
//@Access    Private
router.post('/schedules',addSchedule)

//@Endpoint  http://localhost:5000/api/schedule/1
//@Method    DELETE
//@Access    Private
router.delete('/schedules/:id', removeSchedule)

//@Endpoint  http://localhost:5000/api/schedule/1
//@Method    PUT
//@Access    Private
router.put('/schedules/:id',updateSchedule)

module.exports = router;