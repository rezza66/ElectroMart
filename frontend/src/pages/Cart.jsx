import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { createOrderWithPayment } from "../redux/orderSlice";
import Swal from "sweetalert2";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (cartItemId, newQty) => {
    if (newQty > 0) {
      dispatch(updateCart({ cartItemId, qty: newQty }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

    const handlePayment = async () => {
      if (cartItems.length === 0) {
        Swal.fire("Keranjang Kosong", "Tambahkan produk terlebih dahulu", "warning");
        return;
      }
    
      try {
        setIsLoading(true);
    
        const payload = {
          products: cartItems.map(item => ({
            product: item.product._id || item.product,
            quantity: item.qty,
          })),
          totalAmount: totalPrice,
        };
    
        const action = await dispatch(createOrderWithPayment(payload));
    
        if (createOrderWithPayment.fulfilled.match(action)) {
          const { token: snapToken } = action.payload;
          
          if (typeof window.snap === 'undefined') {
            throw new Error('Midtrans payment gateway failed to load');
          }
    
          window.snap.pay(snapToken, {
            onSuccess: async function(result) {
              Swal.fire({
                title: "Pembayaran Sukses!",
                text: "Pesanan Anda telah berhasil dibayar",
                icon: "success",
                confirmButtonText: "Lihat Pesanan"
              }).then(() => {
                window.location.href = '/orders?payment_success=true';
              });
            },
            onPending: function(result) {
              Swal.fire({
                title: "Menunggu Pembayaran",
                text: "Silahkan selesaikan pembayaran Anda",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Cek Status Pesanan",
                cancelButtonText: "Kembali"
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/orders?payment_pending=true';
                }
              });
            },
            onError: function(result) {
              Swal.fire(
                "Pembayaran Gagal",
                "Silahkan coba lagi atau gunakan metode pembayaran lain",
                "error"
              );
            },
            onClose: function() {
              Swal.fire(
                "Pembayaran Dibatalkan",
                "Anda menutup halaman pembayaran",
                "info"
              );
            }
          });
        } else {
          throw new Error(action.payload || "Gagal membuat pesanan");
        }
      } catch (error) {
        let errorMessage = "Terjadi kesalahan saat memproses pembayaran";
        if (error.message.includes("stok")) {
          errorMessage = "Stok produk tidak mencukupi";
        } else if (error.message.includes("Midtrans")) {
          errorMessage = "Gagal memuat sistem pembayaran";
        }
    
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Mengerti"
        });
      } finally {
        setIsLoading(false);
      }
    };
    

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 mt-16 md:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Keranjang Belanja</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-4">Keranjang Anda kosong.</p>
            <button 
              onClick={() => navigate('/products')} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Belanja Sekarang
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <tr key={item._id || index}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{index + 1}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={`${item.picture ? item.picture : "default-image.jpg"}`}
                              alt={item.name}
                              className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                              className="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.qty}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                              className="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(item.price * item.qty)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              {cartItems.map((item, index) => (
                <div key={item._id || index} className="border-b border-gray-200 p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`${item.picture ? item.picture : "default-image.jpg"}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                        className="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.qty}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                        className="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Total: {formatCurrency(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">
                  Total: {formatCurrency(totalPrice)}
                </span>
                <button
                  className={`px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 ${
                    isLoading || cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handlePayment}
                  disabled={isLoading || cartItems.length === 0}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    "Bayar Sekarang"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;