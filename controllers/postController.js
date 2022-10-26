const db = require("../database/conn");

exports.post = async (req, res) => {
  try {
    const { post_title, post_content, post_category, user_id } = req.body;
    if (!user_id)
      return res.status(401).json({
        status: false,
        message: "Please login !!!",
      });

    const sql = `INSERT INTO post(post_id, post_title, post_content, post_category, user_id) VALUES ("",'${post_title}','${post_content}',${post_category},${user_id})`;
    db.query(sql, (err, data) => {
      console.log(data);
      if (data) {
        return res.status(200).json({
          status: true,
          message: "Ok",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Post Error",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error",
      data: error,
    });
  }
};

exports.get = async (req, res) => {
  try {
    console.log(req.body);
    const sql = `SELECT post.post_id, post.post_title, post.post_content , users.user_fname , users.user_lname,post_category.category_id, post_category.category_name FROM post LEFT JOIN users on (post.user_id = users.user_id)
    LEFT JOIN post_category on (post.post_category = post_category.category_id) ORDER BY post.post_id DESC`;
    db.query(sql, (err, data) => {
      if (data.length) {
        return res.status(200).json({
          status: true,
          message: "Ok",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Get Post Error",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error",
      data: error,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `SELECT post.post_id, post.post_title, post.post_content , users.user_fname , users.user_lname,post_category.category_id, post_category.category_name FROM post LEFT JOIN users on (post.user_id = users.user_id)
        LEFT JOIN post_category on (post.post_category = post_category.category_id) WHERE post.post_id = ${id}`;
    db.query(sql, (err, data) => {
      console.log(data);
      if (data.length > 0) {
        return res.status(200).json({
          status: true,
          message: "Ok",
          data: data[0] || {},
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Get Post Error",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error",
      data: error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    // console.log(user_id, post_id);
    const sql = `SELECT * FROM users WHERE user_id = ${user_id}`;
    db.query(sql, (err, data) => {
      let [user] = data;
      if (user.permission_id == 0) {
        let sql_del = `DELETE FROM post WHERE post.post_id = ${post_id}`;
        db.query(sql_del, (err, data) => {
          console.log(data);
          return res.status(200).json({
            status: true,
            message: "Ok",
          });
        });
      } else {
        return res.status(403).json({
          status: false,
          message: "can't delete post on website",
        });
      }
    });

    // db.query(sql, (err, data) => {
    //     console.log(data);
    //     if (data.length > 0) {
    //         return res.status(200).json({
    //             status: true,
    //             message: "Ok",
    //             data: data[0] || {}
    //         })
    //     } else {
    //         return res.status(400).json({
    //             status: false,
    //             message: "Get Post Error"
    //         })
    //     }
    // });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error",
      data: error,
    });
  }
};
