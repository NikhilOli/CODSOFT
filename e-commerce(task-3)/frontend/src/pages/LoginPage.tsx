import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate()
  
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-gray-900">
            <div className="bg-gray-100 p-12 rounded-lg shadow-xl max-w-lg w-full text-center">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">Welcome to E-commerce Store</h2>
                <p className="text-lg mb-8 text-gray-600">
                    Discover the best products at unbeatable prices. Sign in to access your account and start shopping today!
                </p>
                <button 
                    onClick={() => loginWithRedirect()} 
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors w-full mb-6"
                >
                    Sign In to Continue
                </button>
                <div className="border-t border-gray-300 my-4"></div>
                <button
                    onClick={() => navigate("/admin-login")}
                    className="bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-900 transition-colors w-full"
                >
                    Admin Login
                </button>
                <div className="mt-8">
                    <p className="text-sm text-gray-500">
                        Need an account? Contact us for registration details or sign up with your preferred social media account.
                    </p>
                </div>
            </div>
        </div>
);
};

export default LoginPage;
