const bcrypt = require("bcryptjs");
const db = require("../database/conn");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "fmsbis";

exports.login = async (req, res) => {
  const { email, pass } = req.body;
  const query = `SELECT * FROM users WHERE user_email = "${email}"`;
  db.query(query, async (err, data) => {
    if (data.length > 0) {
      for (let count = 0; count < data.length; count++) {
        const isCorrect = await bcrypt.compare(pass, data[count].user_pass);
        if (isCorrect) {
          token = jwt.sign(
            // count = 0
            { userID: data[count].user_id, email: data[count].user_email },
            TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: data[count],
            token: token,
          });
        } else {
          res.status(400).json({
            status: "fail",
            message: "Incorrect email or password",
          });
        }
      }
    } else {
      res.status(400).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
  });
};

exports.register = async (req, res) => {
  const { email, pass, fname, lname } = req.body;
  const hashPassword = await bcrypt.hash(pass, 8);
  const query = `INSERT INTO users (user_email, user_pass, user_fname, user_lname, permission_id) VALUES ("${email}","${hashPassword}","${fname}","${lname}",1)`;
  db.query(query, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        message: err.code,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Register successfully",
      data: data,
    });
  });
};
