import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import { CartContextProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";

const App = () => {

  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
      setIsCartOpen(!isCartOpen)
  }

  return (
    <Router>
      <CartContextProvider>
        <Toaster />
        <Navbar isCartOpen={isCartOpen} toggleCart={toggleCart} />
        <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />
        <Routes>
          <Route path="/signin" element={<LoginPage />} />

          <Route path="/products" element={
            <div className="flex min-h-screen bg-gray-100">
              <Sidebar />
              <div className="flex-1"> 
                <Products />
              </div>
            </div>
          } />

          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders/*" element={<Orders />} />
        </Routes>
      </CartContextProvider>
    </Router>
  );
};

export default App;
