const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler")

//index
exports.index = asyncHandler(async (req, res, next) => {
    const [
        numItems,
        numCategories
    ] = await Promise.all([
        Item.countDocuments({}).exec(),
        Category.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Inventory Application",
        item_count: numItems,
        category_count: numCategories
    });
});

//display item_list on GET
exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find().exec();

    res.render("item_list", {
        title: "Item List",
        item_list: allItems
    })
})

//create new item with POST
exports.item_create_get = asyncHandler(async(req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render("item_form", {
        title: 'Create Item',
        categories: allCategories
    })
})