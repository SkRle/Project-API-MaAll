const bcrypt = require("bcryptjs");
const db = require('../database/conn');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "123qaz456wsx";

exports.login = async (req, res) => {
  const {
    email,
    pass
  } = req.body;
  const query = `SELECT * FROM users WHERE user_email = "${email}"`
  db.query(query, (err, data) => {
    if (data.length > 0) {
      for (let count = 0; count < data.length; count++) {
        const isCorrect = bcrypt.compare(pass, data[count].user_pass);
        if (isCorrect) {
          token = jwt.sign({
              userID: data[count].user_id,
              email: data[count].user_email
            },
            TOKEN_SECRET, {
              expiresIn: "1h"
            }
          )
          res.status(200).json({
            status: true,
            message: "Login successfully",
            data: data[count],
            token: token
          });
        } else {
          res.status(400).json({
            status: false,
            message: "Incorrect email or password",
          });
        }
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Incorrect email or password",
      });
    }
  })
};

exports.register = async (req, res) => {
  const {
    email,
    pass,
    fname,
    lname
  } = req.body;
  const hashPassword = await bcrypt.hash(pass, 8);
  const query = `INSERT INTO users (user_email, user_pass, user_fname, user_lname, permission_id) VALUES ("${email}","${hashPassword}","${fname}","${lname}",1)`;
  db.query(query, (err, data) => {
    if (err) {
      res.status(400).json({
        status: false,
        message: err.code,
      });
      return
    };

    res.status(200).json({
      status: true,
      message: "Register successfully",
      data: data
    });
  })
}