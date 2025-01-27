import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ProductPage from "./pages/Products";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import CartPage from "./pages/Cart";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Jika /signup ingin menggunakan LoginPopup */}
        <Route
          path="/signup"
          element={<LoginPopup setShowLogin={setShowLogin} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
