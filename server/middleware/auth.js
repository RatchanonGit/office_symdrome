const jwt = require("jsonwebtoken");
const pool = require('../config/db');

const currentUser = async (req, res) => {
  try {
    const { username } = req.user;

    const query = "SELECT username, role_id FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    const user = result.rows[0];
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

const auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("no token , authorization denied");
    }
    const decoded = jwt.verify(token, "jwtSecret");

    req.user = decoded.user
    next()

  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invavid!!");
  }
};


const adminCheck = async (req, res, next) => {
  try {
    const { username } = req.user;


    // Query to fetch user's role_id from PostgreSQL
    const query = "SELECT role_id FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    const userRoleId = result.rows[0].role_id;

    // Query to fetch role_name from role table using the user's role_id
    const roleQuery = "SELECT role_name FROM roles WHERE role_id = $1";
    const roleResult = await pool.query(roleQuery, [userRoleId]);
    const userRoleName = roleResult.rows[0].role_name;

    if (userRoleName === 'admin') {
      next();
    } else {
      return res.status(403).send("Admin Access denied");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Admin Access denied");
  }
};


module.exports = {
  currentUser,
  auth,
  adminCheck
}