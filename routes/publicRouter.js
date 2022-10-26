const express = require("express");
const postController = require("../controllers/postController");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/get-thread", postController.get);
router.get("/get-thread/:id", postController.getById);

router.get("/get-category", categoryController.get);
router.get("/get-category/:id", categoryController.getByIdCategory);

module.exports = router;
