import Cart from "../models/CartModel.js"

export const createCart = async (req, res) => {
  try {
    const { name, qty, price, picture, product } = req.body;
    const user = req.user.id

    if (!name || !qty || !price || !user || !product) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingCartItem = await Cart.findOne({ user, product });

    if (existingCartItem) {
      existingCartItem.qty += qty;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Cart updated successfully",
        cartItem: existingCartItem,
      });
    }

    const newCart = new Cart({ name, qty, price, picture, user, product });
    await newCart.save();

    res.status(201).json({ message: "Product added to cart", cartItem: newCart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate('product');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items', error });
  }
};

export const updateCart = async (req, res) => {
  const { cartItemId } = req.params; 
const { qty } = req.body;

try {
  const cartItem = await Cart.findById(cartItemId); 
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

export const deleteCartAfterPayment = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user.id });
    res.status(200).json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to clear cart" });
  }
};


