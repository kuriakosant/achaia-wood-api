import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  features: [String],
  image: { type: String },
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);