const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler")

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render("category_list", {
        title: "Category List",
        category_list: allCategories
    })
})

//create new category on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render("category_form", {
        title: 'Create Category'
    })
})

//create new category on POST
exports.category_create_post = [
    //Validate and sanitize the name field
    body("name", "Category name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    //Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        //Extract the validation errors from a request
        const errors = validationResult(req);

        //create a category object with escaped and trim data.
        const category = new Category({
            name: req.body.name,
            description: req.body.description
        })

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with sanitized values/error messages.
            res.render("category_form", {
                title: "Create Category",
                category: category,
                errors: errors.array(),
            });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Cat3egory with same name already exists.
            const categoryExists = await Category.findOne({ name: req.body.name }).exec();
            if (categoryExists) {
                //Category exists, redirect to its detail page
                res.redirect(categoryExists.url);
            }
            else {
                await category.save();
                //New Category saved. Redirect to category detail page.
                res.redirect(category.url);
            }
        }
        })
    ]

    exports.category_detail = asyncHandler(async(req, res, next) => {
        //get details of cartegory and all items of that category
        const [category, itemsInCategory] = await Promise.all(
            [
                Category.findById(req.params.id).exec(),
                Item.find({
                    category: req.params.id
                })
            ]
        );

        if (category === null){
            //no results
            const err = new Error("Category not found");
            err.status = 404;
            return next(err);
        }

        res.render("category_detail", {
            title: "Category Detail",
            category: category,
            category_items: itemsInCategory
        })
    })