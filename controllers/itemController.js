const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

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

//create new item with GET
exports.item_create_get = asyncHandler(async(req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render("item_form", {
        title: 'Create Item',
        categories: allCategories
    })
})

//create new item on POST
exports.item_create_post = 
[
    //Convert the categories to an array: [0]
    (req, res, next) => {
        if(!Array.isArray(req.body.category)){
            req.body.category = typeof req.body.category === "undefined" ? [] :  [req.body.category];
        }
        next();
    },

    //Validate and sanitize the fields: [1]
    body("name", "Name must not be empty")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("category.*").escape(),

    //Process request after validation and sanitization: [2]
    asyncHandler(async(req, res, next) => {
        //extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a item object with escaped and trimmed data
        const item = new Item(
            {
                name: req.body.name,
                description: "test Desc",
                category: req.body.category
            }
        );

        if(!errors.isEmpty()){
            //There are errors. Render form again with sanitized values/error messages.
            const allCategories = await Category.find().exec();

            // Mark our selected genres as checked.
            for (const category of allCategories) {
                if (item.category.includes(category._id)) {
                    category.checked = "true";
                }
            }
            res.render("item_form", {
                title: 'Create Item',
                categories: allCategories
            })
            
        }
        else{
            //Data from form is valid. Save item.
            await item.save();
            res.redirect(item.url);
        }
    })
]

//Display detail for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category").exec();

    if(item == null){
        //No results
        const err = new Error("Item not fouond");
        err.status = 404;
        return next(err);
    }

    res.render("item_detail", {
        item: item,
        title: item.name,        
        genre: item.genre
    })
})