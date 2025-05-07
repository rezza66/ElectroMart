import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct, resetAddStatus } from "../redux/productSlice";
import { getCategories } from "../api/apiCategory";
import Sidebar from "../components/Dashboard/Sidebar";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addStatus, error } = useSelector((state) => state.products);
  
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    featured: false,
    weeklyTopSelling: false,
    category: "",
    picture: [],
  });
  const [notification, setNotification] = useState({
    show: false,
    type: '', // 'success' or 'error'
    message: '',
    timer: null
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setCategoryError(null);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setCategoryError("Failed to fetch categories");
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Reset status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetAddStatus());
      if (notification.timer) {
        clearTimeout(notification.timer);
      }
    };
  }, [dispatch, notification.timer]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    
    setProduct((prev) => ({
      ...prev,
      picture: selectedFiles.map((file) => URL.createObjectURL(file)),
    }));
  };

  // Remove selected image
  const removeImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    setProduct((prev) => ({
      ...prev,
      picture: prev.picture.filter((_, i) => i !== index),
    }));
  };

  // Show notification with auto-hide
  const showNotification = (type, message, duration = 5000) => {
    if (notification.timer) {
      clearTimeout(notification.timer);
    }
    
    const timer = setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, duration);

    setNotification({
      show: true,
      type,
      message,
      timer
    });
  };

  // Validate form data
  const validateForm = () => {
    if (!product.name.trim()) {
      showNotification('error', 'Product name is required');
      return false;
    }
    
    if (isNaN(product.price) || product.price <= 0) {
      showNotification('error', 'Price must be a positive number');
      return false;
    }
    
    if (isNaN(product.stock) || product.stock < 0) {
      showNotification('error', 'Stock must be a non-negative number');
      return false;
    }
    
    if (!product.category) {
      showNotification('error', 'Please select a category');
      return false;
    }
    
    if (files.length === 0) {
      showNotification('error', 'Please upload at least one image');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    const productData = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      picture: files
    };

    console.log('Data yang akan dikirim:', productData);
  
    try {
      // Gunakan dispatch di sini
      await dispatch(addNewProduct(productData)).unwrap();
      
      showNotification('success', 'Product added successfully!');
      
      // Reset form
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        featured: false,
        weeklyTopSelling: false,
        category: "",
        picture: [],
      });
      setFiles([]);
      
      // Redirect
      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      showNotification('error', err.message || 'Failed to add product');
      console.error('Add product error:', err);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex pt-16">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Notification Banner */}
        {notification.show && (
          <div className={`fixed top-16 left-0 right-0 z-50 p-4 text-center text-white ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } animate-fade-in`}>
            {notification.message}
            <button 
              onClick={() => {
                clearTimeout(notification.timer);
                setNotification(prev => ({ ...prev, show: false }));
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        )}

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
            <button 
              onClick={toggleSidebar} 
              className="text-gray-500 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>
        
        <div className="m-5 sm:mx-auto sm:w-full sm:max-w-2xl p-6 bg-white rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Product Information</h2>
            
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Product Name*
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                  aria-required="true"
                />
              </div>
              
              <div className="col-span-1">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category*
                </label>
                {loadingCategories ? (
                  <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
                ) : categoryError ? (
                  <p className="text-red-500">{categoryError}</p>
                ) : (
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-required="true"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
              <div className="col-span-1">
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Price*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    aria-required="true"
                  />
                </div>
              </div>
              
              <div className="col-span-1">
                <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">
                  Stock*
                </label>
                <input
                  id="stock"
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter stock quantity"
                  min="0"
                  aria-required="true"
                />
              </div>
            </div>
            
            {/* Description Section */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
                aria-required="true"
              ></textarea>
            </div>
            
            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  name="featured"
                  checked={product.featured}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="featured" className="ml-2 text-gray-700">
                  Featured Product
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="weeklyTopSelling"
                  type="checkbox"
                  name="weeklyTopSelling"
                  checked={product.weeklyTopSelling}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="weeklyTopSelling" className="ml-2 text-gray-700">
                  Weekly Top Selling
                </label>
              </div>
            </div>
            
            {/* Image Upload Section */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Images*
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="picture"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                        accept="image/*"
                        aria-required="true"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              
              {/* Image Previews */}
              {product.picture.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {product.picture.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={addStatus === 'loading'}
                className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  addStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                aria-label="Add product"
              >
                {addStatus === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;