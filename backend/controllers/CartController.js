import Cart from "../models/CartModel.js"

export const createCart = async (req, res) => {
  try {
    const { name, qty, price, picture, user, product } = req.body;

    // Validasi field
    if (!name || !qty || !price || !user || !product) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Periksa apakah produk sudah ada di keranjang
    const existingCartItem = await Cart.findOne({ user, product });

    if (existingCartItem) {
      // Perbarui quantity jika produk sudah ada
      existingCartItem.qty += qty;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Cart updated successfully",
        cartItem: existingCartItem,
      });
    }

    // Jika tidak ada, tambahkan produk baru ke keranjang
    const newCart = new Cart({ name, qty, price, picture, user, product });
    await newCart.save();

    res.status(201).json({ message: "Product added to cart", cartItem: newCart });
  } catch (error) {
    console.error("Error in createCart:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ user: userId }).populate('product');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items', error });
  }
};

export const updateCart = async (req, res) => {
  const { cartItemId } = req.params; // Pastikan Anda menggunakan ID cart, bukan ID produk
const { qty } = req.body;

try {
  const cartItem = await Cart.findById(cartItemId); // Mencari berdasarkan ID cart
  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  cartItem.qty = qty;
  await cartItem.save();
  res.status(200).json({ message: 'Cart item updated', cartItem });
} catch (error) {
  res.status(500).json({ message: 'Failed to update cart item', error });
}
};

export const deleteCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const cartItem = await Cart.findByIdAndDelete(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item removed', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove cart item', error });
  }
};


