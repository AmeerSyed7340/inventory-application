const express = require("express")
const router = express.Router();

//Require controller modules.
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

//GET catalog homepage
router.get("/", item_controller.index);

//GET all items
router.get("/items", item_controller.item_list);

//item_create on GET
router.get("/item/create", item_controller.item_create_get);

//GET all categeories
router.get('/categories', category_controller.category_list);

//category_create on GET
router.get("/category/create", category_controller.category_create_get);

//category_create on POST
router.post("/category/create", category_controller.category_create_post);

//GET request for one category
router.get("/category/:id", category_controller.category_detail);

module.exports = router;