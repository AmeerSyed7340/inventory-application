const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, require: true, minLength: 3, maxLength: 100 },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true },
    category: [{type: Schema.Types.ObjectId, ref: "Category"}],
});

//Virtual for item's URL
ItemSchema.virtual("url").get(function () {
    //Dont use arrow function as we will need to use this object
    return `/catalog/item/${this._id}`
});

module.exports = mongoose.model("Item", ItemSchema);