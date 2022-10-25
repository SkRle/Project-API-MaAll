const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/post-thread", postController.post);
router.delete("/delete-thread", postController.deletePost);

module.exports = router;