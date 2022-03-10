// Detalles compra
// Import Mongoose module
let mongoose = require("mongoose");
// Create user scheme (model)
let Schema = mongoose.Schema;

// Model the Schema
let purchaseDetailSchema = Schema({
  productId: { type: Schema.ObjectId, ref: "product" },
  purchaseId: { type: Schema.ObjectId, ref: "purchase" },
  quantity: Number,
  discountCode: String,
  shippingAddress: String,
  userPhone: {type: Schema.ObjectId, ref: "user"},
});

// Export the file
module.exports = mongoose.model("purchaseDetail", purchaseDetailSchema);
