const pool = require('../config/db');
const queries = require('../queries/title');

const getTitles = (req, res) => {
    pool.query(queries.getTitles, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getTitleById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getTitleById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addTitle = (req, res) => {
    const { title_name } = req.body;
    pool.query(queries.addTitle, [title_name], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Title created successfully.`)
    })
}

const removeTitle = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeTitle, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Title remove successfully.")
    })
}

const updateTitle = (req, res) => {
    const id = parseInt(req.params.id)
    const { title_name } = req.body

    pool.query(queries.updateTitle, [title_name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Title updated successfully.")
    })
}

module.exports = {
    getTitles,
    getTitleById,
    addTitle,
    removeTitle,
    updateTitle
}
