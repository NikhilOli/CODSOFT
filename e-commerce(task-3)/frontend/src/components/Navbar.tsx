
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Cart from "./Cart";

const Navbar: React.FC = () => {
    const { cart } = useCart();
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    const [isCartOpen, setIsCartOpen] = useState(false)

    const toogleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
            E-commerce Store
            </Link>
            <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-300">
                Home
            </Link>
            <div className="relative">
                <button onClick={toogleCart} className="hover:text-gray-300">
                Cart
                {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemsCount}
                    </span>
                )}
                </button>
                {isCartOpen && <Cart />}
            </div>
            <span className="hover:text-gray-300">Welcome, User!</span>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
