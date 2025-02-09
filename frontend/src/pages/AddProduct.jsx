import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";

const AddProduct = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      picture: files.map((file) => URL.createObjectURL(file)), // Simpan URL sementara untuk pratinjau
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan pengiriman data ke server di sini
    console.log(product);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex pt-16">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
            <button onClick={toggleSidebar} className="text-gray-500 lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </header>
        <div className="m-5 sm:mx-auto sm:w-full sm:max-w-md p-6 bg-white rounded-lg shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto pt-24 pb-10 bg-white rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4">Input Product</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={product.featured}
                onChange={handleChange}
                className="mr-2"
              />
              Featured
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="weeklyTopSelling"
                checked={product.weeklyTopSelling}
                onChange={handleChange}
                className="mr-2"
              />
              Weekly Top Selling
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category ID</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Pictures</label>
            <input
              type="file"
              name="picture"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            <div className="mt-2">
              {product.picture.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-20 h-20 object-cover mr-2"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
