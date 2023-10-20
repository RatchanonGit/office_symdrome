const pool = require('../config/db');
const queries = require('../queries/role');

const getRoles = (req, res) => {
    pool.query(queries.getRoles, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getRoleById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getRoleById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addRole = (req, res) => {
    const { role_name } = req.body;
    pool.query(queries.addRole, [role_name], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Role created Successfully.`)
    })
}

const removeRole = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeRole, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Role remove successfully.")
    })
}

const updateRole = (req, res) => {
    const id = parseInt(req.params.id)
    const { role_name } = req.body

    pool.query(queries.updateRole, [role_name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Role updated successfully.")
    })
}

module.exports = {
    getRoles,
    getRoleById,
    addRole,
    removeRole,
    updateRole
}
