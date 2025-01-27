import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice"; // Pastikan path sesuai
import {clearCart} from "../../redux/cartSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mendapatkan state auth dan cart dari Redux
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) =>
    (state.cart.cartItems || []).reduce(
      (total, item) => total + (item.qty || 0),
      0
    )
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/"); 
  };


  return (
    <nav className="bg-orange-600 text-white py-4 px-5 md:px-20 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">Turanjiz</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium"
                : "text-gray-700 font-medium hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium"
                : "text-gray-700 font-medium hover:text-blue-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium"
                : "text-gray-700 font-medium hover:text-blue-500"
            }
          >
            Products
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex space-x-4 items-center">
          <NavLink to="/cart" className="relative hover:underline">
            <div className="relative mr-3">
              <span>Cart</span>
              <span className="absolute top-0 left-7 w-5 h-5 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
          </NavLink>

          {/* Tampilkan tombol berdasarkan status login */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-orange-600 font-semibold py-2 px-4 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/signup"
              className="bg-white text-orange-600 font-semibold py-2 px-4 rounded hover:bg-gray-100"
            >
              Signup
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
