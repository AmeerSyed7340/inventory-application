const express = require("express")
const router = express.Router();

//Require controller modules.
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

//GET catalog homepage
router.get("/", item_controller.index);

module.exports = router;