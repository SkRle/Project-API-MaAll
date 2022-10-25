const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/get-thread", postController.get);
router.get("/get-thread/:id", postController.getById);

module.exports = router;