import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  qty: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'], // Validasi qty minimum
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive'], // Validasi harga minimum
  },
  picture: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // User harus ada
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true, // Product harus ada
  },
}, { timestamps: true }); // Tambahkan timestamps untuk createdAt dan updatedAt

export default mongoose.model('Cart', cartSchema);
