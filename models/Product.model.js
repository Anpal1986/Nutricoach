const { mongoose, Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Product', productSchema);
