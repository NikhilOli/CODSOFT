import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        if (username === "admin" && password === "admin123") {
            navigate("/admin/orders");
        } else {
            toast.error("Invalid admin credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Admin Login</h2>
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-6">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <button 
                    onClick={handleAdminLogin} 
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-800 transition-colors"
                >
                    Sign In as Admin
                </button>
            </div>
        </div>
    );
};

export default AdminLoginPage;