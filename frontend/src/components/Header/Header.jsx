import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";
import { BASE_URL } from "../../utils/config";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mendapatkan state auth dan cart dari Redux
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) =>
    (state.cart.cartItems || []).reduce(
      (total, item) => total + (item.qty || 0),
      0
    )
  );

  // useEffect(() => {
  //   const closeDropdown = (event) => {
  //     if (!event.target.closest(".dropdown-container")) {
  //       setIsDropdownOpen(false);
  //     }
  //   };
  
  //   document.addEventListener("click", closeDropdown);
  //   return () => document.removeEventListener("click", closeDropdown);
  // }, []);
  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-orange-600 text-white py-4 px-5 md:px-20 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">ElectroMart</h1>
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
              {cartCount > 0 && (
                <span className="absolute top-0 left-7 w-5 h-5 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
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
                <img
                  src={`${BASE_URL}/${user.picture}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="mr-2">{user.fullName}</span>
                {user.role === "admin" && (
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
                )}
              </div>

              {/* Dropdown untuk Admin */}
              {user.role === "admin" && isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg">
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
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
      </div>
    </nav>
  );
}

export default Header;
