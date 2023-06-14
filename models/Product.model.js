const { mongoose, Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "This product already exists"],
      trim: true,
      lowercase: true
    },
    description: String,
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Product', productSchema);
