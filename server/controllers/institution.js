const pool = require('../config/db');
const queries = require('../queries/institution');

const getInstitutions = (req, res) => {
    pool.query(queries.getInstitutions, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getInstitutionById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getInstitutionById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addInstitution = async (req, res) => {
    const { institution_name } = req.body;
    const institutionCheck = await pool.query(queries.institutionQuery, [institution_name]);
    if (institutionCheck.rows.length > 0) {
        return res.status(400).send("An institution has been established.");
    }

    pool.query(queries.addInstitution, [institution_name], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Institution created Successfully.`)
    })
}

const removeInstitution = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeInstitution, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Institution remove successfully.")
    })
}

const updateInstitution = async (req, res) => {
    const id = parseInt(req.params.id)
    const { institution_name } = req.body
    const institutionCheck = await pool.query(queries.institutionQuery, [institution_name]);
    if (institutionCheck.rows.length > 0) {
        return res.status(400).send("An institution has been established.");
    }

    pool.query(queries.updateInstitution, [institution_name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Institution updated successfully.")
    })
}

module.exports = {
    getInstitutions,
    getInstitutionById,
    addInstitution,
    removeInstitution,
    updateInstitution
}
