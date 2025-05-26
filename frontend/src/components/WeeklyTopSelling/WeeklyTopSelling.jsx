import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { X } from "lucide-react";

function WeeklyTopSelling() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items: products, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  // Filter hanya produk yang memiliki featured: true
  const weeklyTopSellings = products.filter(
    (product) => product.weeklyTopSelling
  );

  const handleAddToCart = (product) => {
    if (!user) {
      Swal.fire({
        title: "Oops!",
        text: "You need to log in first!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Sign Up",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup"); // Redirect ke halaman signup
        }
      });

      return;
    }

    const cartItem = {
      name: product.name,
      qty: 1,
      price: product.price,
      picture: product.picture[0],
      user: user.id, // Pastikan ini valid
      product: product._id, // Pastikan ini valid
    };

    dispatch(addToCart(cartItem));
    Swal.fire({
      title: "Success!",
      text: "Product added to cart",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="py-12 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Weekly Top Selling
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {weeklyTopSellings.map((product) => (
          <div
            key={product._id}
            className="bg-green4 rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative w-full h-48">
              <img
                src={product.picture}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">{formatCurrency(product.price)}</p>
              <div className="mt-auto flex justify-between items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
                <button className="text-orange-500 hover:underline text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <img
              src={selectedProduct.picture}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700">{selectedProduct.description}</p>
            <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
                {formatCurrency(selectedProduct.price)}
              </span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyTopSelling;
