const pool = require('../config/db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password} = req.body;

    const userQuery = "SELECT * FROM users WHERE username = $1";
    const userResult = await pool.query(userQuery, [username]);
    const user = userResult.rows[0];

    if (user) {
      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }

      // Query to fetch role data from PostgreSQL
      const roleQuery = "SELECT role_name FROM roles WHERE role_id = $1";
      const roleResult = await pool.query(roleQuery, [user.role_id]);
      const role = roleResult.rows[0].role_name;

      // Payload
      const payload = {
        user: {
          username: user.username,
          role: role,
          firstname: user.fname,
          lastname: user.lname,
        },
      };

      // Generate Token
      jwt.sign(payload, "jwtSecret", 
     // { expiresIn: 3600 }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User Not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


module.exports = {
  login
}
