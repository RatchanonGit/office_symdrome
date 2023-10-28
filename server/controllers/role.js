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

const addRole = async (req, res) => {
    const { role_name } = req.body;
    const roleCheck = await pool.query(queries.roleQuery, [role_name]);
    if (roleCheck.rows.length > 0) {
        return res.status(400).send("An role has been established.");
    }
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

const updateRole = async (req, res) => {
    const id = parseInt(req.params.id)
    const { role_name } = req.body
    const roleCheck = await pool.query(queries.roleQuery, [role_name]);
    if (roleCheck.rows.length > 0) {
        return res.status(400).send("An role has been established.");
    }

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
