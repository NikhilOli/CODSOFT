import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import { CartContextProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <CartContextProvider>
        <Toaster />
        <Navbar />
        <Cart />
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
          </div>
        </div>
      </CartContextProvider>
    </Router>
  );
};

export default App;
