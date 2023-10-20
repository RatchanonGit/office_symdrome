const pool = require('../config/db');
const queries = require('../queries/scores');

const getScores = (req, res) => {
    pool.query(queries.getScores, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getScoreById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getScoreById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addScore = (req, res) => {
    const { user_id, task_description, score_value, watch_time, score_date } = req.body;
    pool.query(queries.addScore, [user_id, task_description, score_value, watch_time, score_date], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Score created successfully.`)
    })
}

const removeScore = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeScore, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Score remove successfully.")
    })
}

const updateScore = (req, res) => {
    const id = parseInt(req.params.id)
    const { user_id, task_description, score_value, watch_time, score_date } = req.body

    pool.query(queries.updateScore, [user_id, task_description, score_value, watch_time, score_date, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Score updated successfully.")
    })
}

const getSumScoreAndSumtime = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.sumScoreAndSumtime, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getScoreLimitDate = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.scoreLimitdate, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getScores,
    getScoreById,
    addScore,
    removeScore,
    updateScore,
    getSumScoreAndSumtime,
    getScoreLimitDate
}
