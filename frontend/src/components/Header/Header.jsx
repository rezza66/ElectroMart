import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";
import { ShoppingCart, Menu, X } from "lucide-react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-green1 text-white py-4 px-4 md:px-20 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold">ElectroMart</h1>

          {/* Mobile menu button */}
          <button
            className="ml-4 md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium"
                : "text-white font-medium hover:text-blue-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium"
                : "text-white font-medium hover:text-blue-200"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium"
                : "text-white font-medium hover:text-blue-200"
            }
          >
            Products
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink to="/cart" className="relative hover:underline">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </NavLink>

          {/* Tampilkan tombol berdasarkan status login */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="mr-2">{user.fullName}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>

              {/* Dropdown untuk User */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-50">
                  {user.role === "user" && (
                    <>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Orders
                      </NavLink>
                    </>
                  )}
                  {user.role === "admin" && (
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeDropdown}
                    >
                      Dashboard
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/signup"
              className="bg-white text-orange-600 font-semibold py-2 px-4 rounded hover:bg-gray-100"
            >
              Signup
            </NavLink>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-white text-orange-600 font-semibold py-2 px-4 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Cart Icon (visible only on mobile) */}
        <div className="md:hidden">
          <NavLink to="/cart" className="relative">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green2 pb-4 px-4">
          <div className="flex flex-col space-y-3 pt-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive
                    ? "bg-orange-700 text-white"
                    : "text-white hover:bg-orange-700"
                }`
              }
              onClick={toggleMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive
                    ? "bg-orange-700 text-white"
                    : "text-white hover:bg-orange-700"
                }`
              }
              onClick={toggleMobileMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive
                    ? "bg-orange-700 text-white"
                    : "text-white hover:bg-orange-700"
                }`
              }
              onClick={toggleMobileMenu}
            >
              Products
            </NavLink>

            {user ? (
              <>
                {user.role === "user" && (
                  <>
                    <NavLink
                      to="/profile"
                      className="block py-2 px-4 text-white bg-green4 hover:bg-green-600 rounded"
                      onClick={() => {
                        toggleMobileMenu();
                        closeDropdown();
                      }}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="block py-2 px-4 text-white bg-green4 hover:bg-green-600 rounded"
                      onClick={() => {
                        toggleMobileMenu();
                        closeDropdown();
                      }}
                    >
                      Orders
                    </NavLink>
                  </>
                )}
                {user.role === "admin" && (
                  <NavLink
                    to="/dashboard"
                    className="block py-2 px-4 text-white bg-green4 hover:bg-green-600 rounded"
                    onClick={() => {
                      toggleMobileMenu();
                      closeDropdown();
                    }}
                  >
                    Dashboard
                  </NavLink>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="w-full text-left py-2 px-4 bg-green4 text-white font-semibold rounded hover:bg-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/signup"
                className="block py-2 px-4 bg-green4 text-white font-semibold rounded hover:bg-green-600 text-center"
                onClick={toggleMobileMenu}
              >
                Signup
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
