import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Header/Header';
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

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<LoginPopup setShowLogin={setShowLogin} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path='/cart' element={
          <RoleBasedRoute allowedRoles={['user']}>
            <CartPage />
          </RoleBasedRoute>
        } />
        <Route path='/dashboard' element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <Dashboard />
          </RoleBasedRoute>
        } />
        <Route path='/addproduct' element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <AddProduct />
          </RoleBasedRoute>
        } />
        <Route path='/userlist' element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <UserList />
          </RoleBasedRoute>
        } />
        <Route path="/access-denied" element={<AccessDenied />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
