// Compra
// Import mongoose
let mongoose = require("mongoose");
// Method to create the mongoose schema
let Schema = mongoose.Schema;

// User Schema
let purchaseSchema = Schema({
    userId: {type: Schema.ObjectId, ref: "user"},
    datePurchase: {type: Date, default: Date.now},
});
// Export the module
modules.exports = mongoose.model("purchase", purchaseSchema);