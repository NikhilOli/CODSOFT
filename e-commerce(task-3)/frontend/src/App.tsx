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
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
      setIsCartOpen(!isCartOpen)
  }

  return (
    <Router>
      <CartContextProvider>
        <Toaster />
        <Navbar isCartOpen={isCartOpen} toggleCart={toggleCart} isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />
        <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage setIsAdminLoggedIn={setIsAdminLoggedIn}/>} />
          <Route path="/admin/orders" element={<AdminPage />} />

          <Route element={<ProtectedRoute />}>
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
          </Route>
        </Routes>
      </CartContextProvider>
    </Router>
  );
};

export default App;
