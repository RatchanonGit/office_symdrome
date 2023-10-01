const userQuery = "SELECT username, password, role_id, fname, lname FROM users WHERE username = $1";
const roleQuery = "SELECT role_name FROM roles WHERE role_id = $1 ";
const userAndRoleQurty = "SELECT username, role_id FROM users WHERE username = $1";
const roleIDquery = "SELECT role_id FROM users WHERE username = $1";

module.exports = {
    userQuery,
    roleQuery,
    userAndRoleQurty,
    roleIDquery
}