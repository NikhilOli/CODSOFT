import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import UserDetails from "../pages/UserDetails";

interface CartProps {
    isCartOpen: boolean;
    isAdminLoggedIn: boolean;
    setIsAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    toggleCart: () => void;
}

const Navbar: React.FC<CartProps> = ({ toggleCart, isAdminLoggedIn, setIsAdminLoggedIn }) => {
    const { cart } = useCart();
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    const { isAuthenticated, user } = useAuth();
    const { logout } = useAuth0();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

    const toggleUserDetails = () => {
        setIsUserDetailsOpen(!isUserDetailsOpen);
    };

    const handleUserClick = () => {
        setShowUserInfo((prev) => !prev);
    };

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/products" className="text-xl font-bold">
                    E-commerce Store
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/products" className="hover:text-gray-300">
                        Home
                    </Link>
                    {isAdminLoggedIn ? (
                        <>
                            <Link to="/admin/orders" className="text-white hover:text-gray-300">
                                Admin Orders
                            </Link>
                            <button
                                className="text-white hover:text-gray-300"
                                onClick={() => {
                                    setIsAdminLoggedIn(false);
                                    window.location.href = '/';
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="relative">
                                <button onClick={toggleCart} className="hover:text-gray-300">
                                    Cart
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                            <Link to="/orders/pending" className="hover:text-gray-300">
                                Orders
                            </Link>
                            {isAuthenticated ? (
                                <button
                                    onClick={() => logout({ logoutParams: { returnTo: `${window.location.origin}` } })}
                                    className="hover:text-gray-300"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/" className="hover:text-gray-300">
                                    Login
                                </Link>
                            )}
                            {isAuthenticated && user && (
                                <div className="relative text-slate-50">
                                    <span
                                        className="font-semibold text-lg cursor-pointer"
                                        onClick={handleUserClick}
                                    >
                                        Hi {user.name}!
                                    </span>
                                    {showUserInfo && (
                                        <div className="absolute top-10 right-0">
                                            <UserDetails
                                                isUserDetailsOpen={showUserInfo}
                                                toggleUserDetails={toggleUserDetails}
                                                user={user}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
