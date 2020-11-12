const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Schema = mongoose.Schema;

const Product = new Schema({
  _id: { type: String, default: nanoid() },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  availableSizes: { type: [String], required: true },
  price: { type: String, required: true }
});

module.exports = mongoose.model('Product', Product);