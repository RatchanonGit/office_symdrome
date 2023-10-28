const getRoles = "SELECT * FROM roles";
const getRoleById = "SELECT * FROM roles WHERE role_id = $1";
const addRole = "INSERT INTO roles(role_name) VALUES ($1)";
const removeRole = "DELETE FROM roles WHERE role_id = $1";
const updateRole = "UPDATE roles SET role_name = $1 WHERE role_id = $2"
const roleQuery = `SELECT role_name FROM roles WHERE role_name = $1`;

module.exports = {
    getRoles,
    getRoleById,
    addRole,
    removeRole,
    updateRole,
    roleQuery
}