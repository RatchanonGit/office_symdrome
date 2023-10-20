const pool = require('../config/db');
const queries = require('../queries/schedules');

const getSchedules = (req, res) => {
    pool.query(queries.getSchedules, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getScheduleById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getScheduleById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addSchedule = (req, res) => {
    const { days_of_week, schedule_time, task_description, video_id, mode, image } = req.body;
    pool.query(queries.addSchedule, [days_of_week, schedule_time, task_description, video_id, mode, image],
        (error, results) => {
            if (error) throw error;
            res.status(201).send(`Schedule created Successfully.`)
        })
}

const removeSchedule = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeSchedule, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Schedule remove successfully.")
    })
}

const updateSchedule = (req, res) => {
    const id = parseInt(req.params.id)
    const { days_of_week, schedule_time, task_description, video_id, mode ,image } = req.body

    pool.query(queries.updateSchedule, [days_of_week, schedule_time, task_description, video_id, mode, image, id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send("Schedule updated successfully.")
        })
}

module.exports = {
    getSchedules,
    getScheduleById,
    addSchedule,
    removeSchedule,
    updateSchedule
}
