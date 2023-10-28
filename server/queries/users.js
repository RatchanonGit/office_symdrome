const getUsers = `SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.tel, u.image , 
                  r.role_name, r.role_id,
                  i.institution_name, i.institution_id,
                  t.title_name , t.title_id
                  FROM users u 
                  INNER JOIN roles r ON u.role_id = r.role_id 
                  INNER JOIN institution i ON u.institution_id = i.institution_id 
                  INNER JOIN titles t ON u.title_id = t.title_id;`;

const addUser = `INSERT INTO users(username, password, fname, lname, image, email, tel, title_id, 
                 institution_id, registration_date, role_id, rank) 
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;


const updateUser = `UPDATE users SET username = $1, password = $2, fname = $3, lname = $4, image = $5, 
                    email = $6, tel = $7, title_id = $8, institution_id = $9, registration_date = $10, 
                    role_id = $11, rank = $12 WHERE user_id = $13`

const usernameQuery = `SELECT username FROM users WHERE username = $1`;
const emailQuery = `SELECT email FROM users WHERE email = $1`;
const telQuery = `SELECT tel FROM users WHERE tel = $1`;
const removeUser = "DELETE FROM users WHERE user_id = $1";
const getUserById = "SELECT * FROM users WHERE user_id = $1";
module.exports = {
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
    usernameQuery,
    emailQuery,
    telQuery
}