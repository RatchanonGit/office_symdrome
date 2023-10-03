const pool = require('../config/db');
const queries = require('../queries/dashboard');

const getSumUser = (req, res) => {
    pool.query(queries.sumUser, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getSumScore = (req, res) => {
    pool.query(queries.sumScore, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getSumTime = (req, res) => {
    pool.query(queries.sumTime, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getSumScoreLimitDate = (req, res) => {
    pool.query(queries.sumScoreLimitDate, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getSumUserOnInstitution = (req, res) => {
    pool.query(queries.sumUserOnInstitution, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getTopTenScore = (req, res) => {
    pool.query(queries.topTenScore, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}


module.exports = {
    getSumUser,
    getSumScore,
    getSumTime,
    getSumScoreLimitDate,
    getSumUserOnInstitution,
    getTopTenScore
}

