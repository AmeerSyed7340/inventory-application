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