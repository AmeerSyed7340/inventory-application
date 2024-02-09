const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, require: true, minLength: 3, maxLength: 100},
    description: {type: String, required: true},
});

//Virtual for item's URL
CategorySchema.virtual("url").get(function(){
    //Dont use arrow function as we will need to use this object
    return `/catalog/category/${this._id}`
});

module.exports = mongoose.model("Category", CategorySchema);

