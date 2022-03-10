// Import mongoose
let mongoose = require("mongoose");
// Method to create the mongoose schema
let Schema = mongoose.Schema;

// User Schema
let productSchema = Schema({
    name: String,
    description: String,
    image: String,
    cost: Number,
    price: Number,
    color: String,
    idcategory: {type: Schema.ObjectId, ref: 'category'},
    type: String,
    stock: Number,

});
    
// Export the module
module.exports = mongoose.model("product", productSchema);
