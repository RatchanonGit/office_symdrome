const jwt = require("jsonwebtoken");
const pool = require('../config/db');
const secretKey = process.env.JWT_SECRET;
const queries = require('../queries/auth')

const currentUser = async (req, res) => {
  try {
    const { username } = req.user;
    const result = await pool.query(queries.userAndRoleQurty, [username]);
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
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded.user
    next()

  } catch (err) {
    console.log(err);
    res.status(401).send("Token invavid, Plase login again.");
  }
};


const adminCheck = async (req, res, next) => {
  try {
    const { username } = req.user;
    const result = await pool.query(queries.roleIDquery, [username]);
    const userRoleId = result.rows[0].role_id;

    const roleResult = await pool.query(queries.roleQuery, [userRoleId]);
    const userRoleName = roleResult.rows[0].role_name;

    if (userRoleName === 'Admin') {
      next();
    } else {
      return res.status(401).send("Access denied, Must be an admin level official only.");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Admin access denied");
  }
};


module.exports = {
  currentUser,
  auth,
  adminCheck
}