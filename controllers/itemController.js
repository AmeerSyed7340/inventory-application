const Item = require("../models/item");

const asyncHandler = require("express-async-handler")

//index
exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', {
        title: "Inventory Application",
    });
});