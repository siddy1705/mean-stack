var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  created_at: { type: Date, default: Date.now },
}, { strict: false });

module.exports = mongoose.model('Product', ProductSchema);