// Import Mongoose
let mongoose = require("mongoose");
// Module for node/express
let Schema = mongoose.Schema;
// User Schema
let stockSchema = Schema({
    productId: {type: Schema.ObjectId, ref: "product"},
    quantity: Number,
    size: String, 
});

// Export the module
module.exports = mongoose.model("stock", stockSchema);
