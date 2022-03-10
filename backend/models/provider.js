// Import Mongoose
let mongoose = require("mongoose");
// Module for node/express
let Schema = mongoose.Schema;
// User Schema
let providerSchema = Schema({
    providerId: String,
    providerName: String,
});

// Export the module
module.exports = mongoose.model("provider", providerSchema);
