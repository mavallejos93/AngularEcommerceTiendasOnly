let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = Schema({
    title: String,
    description: String,

});

module.exports = mongoose.model('category',CategorySchema);