import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { Search, X } from "lucide-react";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils/config";
import axios from "axios";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories([{ name: "All", picture: "" }, ...response.data]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen py-16 bg-slate-300">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-20 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Electronic Store
            </h1>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-96 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-20 py-6">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category.name || "All")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                selectedCategory === (category.name || "All")
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.picture && (
                <img
                  src={`${BASE_URL}/${category.picture}`}
                  alt={category.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              {category.name || category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative w-full h-48">
                <img
                  src={`${BASE_URL}/${product.picture[0]}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formatCurrency(product.price)}
                </p>
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
      </main>

      {/* Modal */}
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
              src={`${BASE_URL}/${selectedProduct.picture}`}
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
};

export default ProductPage;
