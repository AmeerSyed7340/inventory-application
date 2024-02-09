const express = require("express")
const router = express.Router();

//Require controller modules.
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

//GET catalog homepage
router.get("/", item_controller.index);

//GET all items
router.get("/items", item_controller.item_list);

//GET all categeories
router.get('/categories', category_controller.category_list)

module.exports = router;