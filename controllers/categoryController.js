const db = require("../database/conn");

exports.get = async (req, res) => {
  try {
    const query = `SELECT * FROM post_category `;
    db.query(query, (err, data) => {
      console.log(data);
      if (data.length) {
        return res.status(200).json({
          status: true,
          message: "Ok",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Get Category Error",
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

exports.getByIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT post.post_id, post.post_title, post.post_content , users.user_fname , users.user_lname,post_category.category_id, post_category.category_name FROM post LEFT JOIN users on (post.user_id = users.user_id)
                    LEFT JOIN post_category on (post.post_category = post_category.category_id) WHERE category_id = ${id}`;
    db.query(query, (err, data) => {
      // console.log(data);
      if (data.length > 0) {
        return res.status(200).json({
          status: true,
          message: "Ok",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Get by id categetor Error",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Get Post Category Error",
    });
  }
};
