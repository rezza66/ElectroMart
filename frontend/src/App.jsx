import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ProductPage from "./pages/Products";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import CartPage from "./pages/Cart";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/AddProduct";
import UserList from "./pages/UserList";
import RoleBasedRoute from "./components/RoleBaseRoute/RoleBaseRoute";
import AccessDenied from "./components/AccessDenied/AccessDenied";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CheckoutPage from "./pages/Checkout";
import OrdersPage from "./pages/Orders";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={<LoginPopup setShowLogin={setShowLogin} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route
            path="/cart"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <CartPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <CheckoutPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <Profile />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <OrdersPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <EditProfile />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/addproduct"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AddProduct />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/userlist"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <UserList />
              </RoleBasedRoute>
            }
          />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
