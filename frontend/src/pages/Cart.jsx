import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, removeFromCart } from "../redux/cartSlice";
import { BASE_URL } from "../utils/config";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Fungsi untuk mengubah kuantitas item
  const handleQuantityChange = (cartItemId, newQty) => {
    console.log("cartItemId:", cartItemId, "newQty:", newQty);
    if (newQty > 0) {
      dispatch(updateCart({ cartItemId, qty: newQty }));
    }
  };

  // Fungsi untuk menghapus item dari cart
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Fungsi untuk menghitung total harga
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Fungsi untuk memformat mata uang
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 lg:px-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2 text-left">No</th>
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Total</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item._id || index} className="border-b">
                      <td className="px-4 py-2 text-center">{index + 1}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-4">
                          <img
                            src={`${BASE_URL}/${
                              item.picture
                                ? item.picture.replace(/\\/g, "/")
                                : "default-image.jpg"
                            }`}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="font-semibold text-gray-800">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            onClick={() =>
                              handleQuantityChange(item._id, item.qty - 1)
                            }
                          >
                            -
                          </button>
                          <span className="font-medium">{Number.isNaN(item.qty) ? 0 : item.qty}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            onClick={() =>
                              handleQuantityChange(item._id, item.qty + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-2 text-right">
                      {formatCurrency((item.price || 0) * (item.qty || 0))}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">
                Total: {formatCurrency(totalPrice)}
              </span>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
