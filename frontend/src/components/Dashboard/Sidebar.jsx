import React, { useState, useEffect } from "react";
import { Calendar, Users, Map, DollarSign, BarChart2, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("/");

  const menuItems = [
    { icon: BarChart2, text: "Dashboard", link: "/dashboard" },
    { icon: Calendar, text: "Add Product", link: "/addproduct" },
    { icon: Users, text: "Customers", link: "/userlist" },
  ];

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transition duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between p-6">
        <span className="text-white text-xl font-semibold">Electro Dashboard</span>
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-5">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center py-2 px-4 ${
              activeItem === item.link
                ? "text-white bg-gray-900"
                : "text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveItem(item.link)}
          >
            <item.icon className="mr-3" size={20} />
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;