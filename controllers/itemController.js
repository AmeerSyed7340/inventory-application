const Item = require("../models/item");

const asyncHandler = require("express-async-handler")

//index
exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item index")
});